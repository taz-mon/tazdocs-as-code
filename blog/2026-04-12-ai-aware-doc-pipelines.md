---
title: Thoughts about making documentation pipelines LLM friendly
description: How an AI-aware documentation pipeline changes what quality means, what the toolchain looks like, and why most teams are still treating it as an editorial task.
slug: ai-aware-doc-pipelines
authors: [tom]
tags: [documentation, AI, pipeline, VectorLint, agentic, llms-txt]
date: 2026-04-12
draft: true
---

I spent the better part of a sprint recently building a CI/CD pipeline whose only job is to review documentation. Not code. Not infrastructure. Documentation.

That sentence probably sounds either obvious or excessive, depending on where you work. If you're at a company where documentation feeds a RAG system, powers AI-assisted answers, or gets consumed directly by coding agents — it should sound obvious. If you're still treating documentation as something that gets reviewed at the end of a sprint when everyone's already tired, we need to talk.

<!-- truncate -->

## The category shift no one announced

For most of software's history, documentation quality was an editorial problem. You needed clear writing, consistent terminology, accurate procedures. The tools were style guides, peer review, and if you were lucky, a technical editor who actually read the stuff.

That model hasn't been replaced — but it's no longer sufficient. Documentation now has a second audience that doesn't read: it processes. Coding agents, RAG pipelines, LLM tool-use chains — they consume documentation mechanically, and they fail mechanically when the documentation is wrong.

The failure modes are different from human failure modes. A human reviewer catches a missing step. An agent hits a truncation threshold at 100,000 characters and silently stops reading, not knowing it missed the crucial section at the bottom. A human notices the terminology shifted between two articles. An agent retrieves the wrong article entirely because there's no `llms.txt` telling it where to look, so it falls back on training data from eighteen months ago.

Research into agent documentation access patterns confirms that agents treat `llms.txt` as a primary discovery mechanism; sites without one force agents to reconstruct structure from memory, which produces inconsistent and sometimes fabricated URLs. That's not an editorial problem. That's an infrastructure problem.

## What I built — and why

The pipeline I built is a three-phase documentation quality system layered into a Docusaurus docs-as-code workflow. Here's the shape of it.

**Phase 1** is deterministic: Markdown linting, frontmatter validation, broken-link detection, and Docusaurus build verification. These checks are objective, fast, and have no false positives. They block merge when they fail and catch the class of errors that currently surface during code review when the reviewer is already spending attention on content.

The frontmatter piece deserves more attention than it usually gets. Structured metadata enforced against a schema on every PR is what turns a folder of Markdown files into a governable content corpus. Without it, you have no reliable way to generate an inventory, build a meaningful `llms.txt`, or track what changed between sprints. Metadata is the formal contract between the content and the systems that consume it: the search index, the RAG pipeline, the sidebar routing, the documentation inventory. Phase 1 enforces that contract before anything else runs.

Here's the schema I settled on:

```yaml
---
title: "WebSocket Connection Guide"
description: "Step-by-step setup for real-time WebSocket connections in Acme API v2.0."
sidebar_label: "WebSocket Connections"
doc_type: how-to
context: end-user
domain: api-reference
prerequisites: ["Basic Setup", "API Authentication"]
tags: ["websockets", "real-time", "api-v2", "javascript"]
---
```

Each field is doing specific work. `title` and `description` are the primary signals for RAG retrieval ranking and `llms.txt` generation — an agent decides whether to fetch a page largely on the strength of these two fields, so vague descriptions are a retrieval failure waiting to happen.

`doc_type` maps to the Diátaxis content taxonomy with two domain-specific extensions: `how-to | tutorial | concept | reference | troubleshooting | observability-status | health-status | release-notes`. This field matters more than it looks. A user asking "why is my webhook not firing" should retrieve `troubleshooting` pages, not `how-to` pages about webhook setup — even though both will score high on keyword similarity. The field gives the retrieval layer a filter it can't infer from content alone. The same logic applies to `release-notes`: tagging them explicitly lets you exclude them from certain retrieval contexts rather than having an agent cite a changelog entry as authoritative product guidance.

`context` is the trust boundary field: `end-user | admin`. It enforces the split between UI surfaces accessible to end users and UI surfaces only admins can reach. An agent retrieving admin configuration docs for an end-user query isn't just a content quality issue — it's a product risk. This field makes that boundary machine-enforceable.

`domain` drives sidebar routing within the Docusaurus instance: `platform | api-reference | sdk`. Each domain maps to a separate sidebar config and TOC. This field belongs in frontmatter rather than purely in the build config because it needs to be visible to agents navigating the content — they can use it to understand which documentation area they're in and filter accordingly.

`prerequisites` is the field most documentation schemas leave out. An ordered list of pages or concepts required before this one helps agents build context chains when a user's question requires understanding something that isn't on the current page. It also helps human readers self-diagnose gaps without opening a support ticket.

`last_updated` is deliberately absent from frontmatter. A manually maintained date drifts from the moment someone forgets to update it. Instead, it's injected at build time via a remark plugin reading the git commit date for each file — always accurate, never a schema violation waiting to happen.

The schema is enforced via `frontmatter.schema.json` with `additionalProperties: false`. That last constraint matters: a PR that introduces an unrecognized field fails validation. No one-off fields, no undocumented metadata that quietly breaks downstream systems.

**Phase 2** is where it gets interesting. This is LLM-based prose linting using [VectorLint](https://vectorlint.mintlify.app) — an open-source tool that uses an LLM-as-a-Judge approach to evaluate documentation against style rules. You encode your style guide into rule pack files (Markdown prompts, essentially), configure them in `.vectorlint.ini`, and the pipeline runs `vectorlint check` against every changed documentation file on every PR.

The thing that makes this work architecturally is that VectorLint supports two evaluation modes. **Check rules** return countable violations scored by error density — appropriate for objective concerns like terminology consistency and banned phrases. **Judge rules** score content against weighted criteria using a rubric — appropriate for qualitative concerns like tone, clarity, and AI writing pattern detection. Both modes return structured JSON, so the CI runner can parse scores deterministically and post actionable feedback as PR comments.

One operational note that took me a while to internalize: these checks start as warnings. Not errors. A pipeline that blocks merges on subjective LLM scores that haven't been calibrated against your actual content kills adoption before it starts. You calibrate first — build a golden set of 20-30 documents, pre-scored by a human reviewer, and validate that VectorLint agrees with your human judgment at 90% or better on clearly-good and clearly-bad documents. Then you promote to blocking.

**Phase 3** addresses the machine-consumption layer: generating `llms.txt`, running the [afdocs CLI](https://www.npmjs.com/package/afdocs) against the deployed site to validate agent-friendly compliance, enforcing page-size limits that keep content under agent truncation thresholds, and building a structured documentation inventory that tracks what exists, where it is, and when it changes.

Research into how agents consume documentation reveals that agents are mechanically prevented from seeing content past truncation thresholds — often around 150,000 characters — without knowing they've missed anything. Long pages with tabbed or dropdown-filtered content serialize into undifferentiated walls of text and must be avoided. The afdocs tool, built by Dachary Carey from her research into agent documentation access patterns, runs 22 checks across 7 categories — content discoverability, Markdown availability, page size, URL stability, and more. It exits with code 1 on failure, which makes it directly wirable into a CI gate. Rather than inventing my own definition of what makes documentation machine-readable, I adopted the spec.

## The validation problem nobody talks about

Here's something that stopped me cold when I was thinking through Phase 2. You can't just write an LLM prompt and assume it evaluates what you think it evaluates.

Dachary Carey's skill validator analysis of 234 Agent Skills — including 16 published by Anthropic — reported 8 errors and 39 warnings against Anthropic's own skills, with 3 of 16 failing validation entirely. These weren't exotic edge cases. Broken internal links. Files placed in non-standard directories that agents following the spec's discovery conventions would never find. Description fields stuffed with comma-separated keywords rather than useful activation context for the agent.

The lesson I take from that analysis: if the people who wrote the spec can ship skills that don't pass their own validator, the gap between spec-as-written and spec-as-practiced is real, and it closes through tooling, not intention.

The standout performer in the community analysis was obra/superpowers: 14 skills, zero errors, each focused on a single workflow. What makes it work? The skills are lean and focused. Each skill does one thing and provides just enough context for the agent to execute that workflow.

That's the same principle behind well-structured documentation pages. One topic. Under 800 words. Scoped to a specific task and audience. It's not an arbitrary constraint — it's the architecture that makes agent retrieval accurate.

The calibration requirement in Phase 2 of my pipeline is the documentation equivalent of running the validator. Before any rule is promoted from warning to blocking, it has to demonstrate statistical agreement with human judgment on a pre-scored golden set. This is measurable. It's the difference between a pipeline that catches real issues and one that just generates noise.

## The domain accuracy problem

AI-native platforms operate at the intersection of complex technical domains. Documentation that defines concepts loosely will produce AI responses that are plausible but imprecise. That makes concept precision in documentation a first line of defense, not just a quality preference.

I'd extend that beyond AI-native platforms. Any team whose documentation feeds a RAG system, a coding agent, or an LLM tool-use workflow is operating in this category whether they've named it or not. The terminology consistency check in Phase 2 exists precisely because terminology drift — "rule pack" becoming "ruleset" in one article, "evaluation" becoming "analysis" in another — produces retrieval confusion at the indexing layer. The human reader can usually infer intent. The agent cannot.

This is why `VECTORLINT.md` exists as a concept: a global instruction file that sets baseline context for all evaluations — audience, tone, terminology standards — so that individual rule packs enforce specific criteria on top of a shared foundation. It's the style guide made machine-executable.

## What the pipeline actually costs

Being honest about this matters. The manual process I replaced was approximately 2 hours of style review per new article — cutting and pasting content through an ad hoc AI chat session, applying the output, then submitting the MR. With 5-8 articles per sprint requiring that treatment, that's 10-16 hours of documentation time per sprint before any human review begins.

Phase 2 turns that into a review of structured, specific automated feedback. The 2-hour manual process becomes roughly 30 minutes of acting on CI output. Conservative estimate: 7-12 hours recovered per sprint from style review reduction alone.

The harder-to-quantify cost is sprint-end quality under pressure. Most sprints have a final-two-days crunch where late-breaking documentation needs to be written, reviewed, and submitted when everyone's attention is already stretched. Phase 1 and Phase 2 help here even without autonomous drafting: when a contributor submits late-breaking content, the pipeline catches structural and style issues automatically. The reviewer approves substance rather than triaging problems that tooling should have caught. The quality argument matters as much as the time argument — errors survive into merge when reviewers are tired, and a pre-validated draft changes the error rate regardless of the hour.

Model selection is a tunable cost lever here. The LLM-based checks use the Anthropic API. `claude-sonnet-4-6` gives the best quality-to-latency balance for CI use; `claude-haiku-4-5` is available for high-volume runs where speed matters more. Final cost estimates depend on rule volume and run frequency — which is exactly what Phase 1 establishes as a baseline.

## The governance layer

One structural decision that I think often gets underweighted: `AGENTS.md`.

An `AGENTS.md` file at the repository root defines how AI agents — Claude, Copilot, Cursor, whatever tooling contributors bring to the PR — should interact with the repository. Style-guide rules. Approved terminology. Documentation boundaries. What they should and should not do. It's the AI governance layer for the repository.

The reason this matters alongside the pipeline: if contributors' AI tools don't know the project's conventions, the pipeline catches violations after they're already in a PR, requiring a correction cycle. If the AI tools know the conventions upfront through `AGENTS.md`, fewer violations reach the pipeline in the first place. The pipeline and the governance file work together — one catches what the other prevents.

## Two audiences now

Every documentation decision has to be made with both audiences in mind.

The human reader needs clear structure, accurate procedures, and consistent terminology. The agent reader needs the same things, plus: page-size discipline (no silent truncation), `llms.txt` for navigational discovery, Markdown availability for clean text extraction, and structural consistency that makes retrieval reliable.

These requirements aren't in conflict. A documentation site that's well-structured for agents is almost always better for humans too. Shorter focused pages are easier to read. Consistent terminology is easier to follow. Stable URLs are easier to bookmark and link.

The pipeline I built enforces both sets of requirements — deterministically in Phase 1, through LLM evaluation in Phase 2, and against community-standard agent compliance criteria in Phase 3. The quality gate runs on every PR. By the time a change reaches human review, it's already been evaluated against the style guide, the terminology standards, and the agent-readiness spec.

That's what it means to treat documentation as an engineering problem. Not because the writing doesn't matter — it does — but because the infrastructure that makes the writing findable, accurate, and machine-consumable requires the same discipline as any other system you'd put into production.

---

*The VectorLint documentation I've been contributing to is live at [vectorlint.mintlify.app](https://vectorlint.mintlify.app). The afdocs CLI and Agent-Friendly Documentation Spec are Dachary Carey's work — [agentdocsspec.com](https://agentdocsspec.com) and the [afdocs npm package](https://www.npmjs.com/package/afdocs). Her [agent skill analysis](https://dacharycarey.com/2026/02/13/agent-skill-analysis/) is worth reading in full if you're building or distributing Agent Skills.*
