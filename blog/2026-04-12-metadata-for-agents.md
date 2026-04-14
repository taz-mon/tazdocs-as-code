---
title: Writing for agents, not just for humans anymore
description: How technical writers develop methods for documentation's second audience — the agents and RAG pipelines that process content without reading it.
slug: writing-for-agents
authors: [tom]
tags: [documentation, metadata, RAG, agents, frontmatter, agentic]
date: 2026-04-12
---

Technical writing has always evolved to meet new constraints. We learned information architecture when documentation moved online. We learned topic-based authoring when content management systems demanded structured reuse. We learned docs-as-code when engineering teams needed documentation in the same workflows as the software it described. Each shift asked us to develop new methods — and each time, the writers who understood the new constraints earliest produced the best outcomes.

The current shift is this: documentation now has a second audience that processes it instead of reading it. And the methods that serve this audience start with frontmatter.

<!-- truncate -->

## The second audience

Documentation has always had one primary audience: the human reader. That audience reads titles to decide whether to click, skims descriptions to orient themselves, and infers meaning from context.

Agents don't do any of these. A RAG pipeline or coding agent decides whether to retrieve a page largely on the strength of metadata fields like `title` and `description` before it ever reads the content. If those fields are non-existent or vague and lead to imprecise inference, the page gets ranked lower than it should, retrieved in the wrong context, or skipped entirely. The agent then falls back on training data, which may be months or years out of date, and surfaces a plausible-sounding answer that doesn't reflect your actual product. People want to blame LLMs for hallucinations, but when you look deeper into the causes, unstructured documentation can be one of them.

I'm not saying it's a writing quality problem; it can be a metadata problem.

There's a mechanical constraint that makes this worse. Dachary Carey's research into agent documentation access patterns, drawn from manually validating 578 coding patterns across 20 skills with Claude, found that agents:
* Become silently blocked from reading content past truncation thresholds without knowing they've missed anything.
* Must reconstruct structure from memory when there is no `llms.txt` index of documentation, which results in inconsistent and sometimes fabricated URLs. 
* Give up reading a long page after they hit a token threshold halfway through, effectively rendering the key information in the bottom of the article invisible.

For more information, see the [Agent-Friendly Documentation Spec](https://agentdocsspec.com) they developed from that research. This project codifies these failure modes into 22 testable checks across 7 categories. You can use it to test your metadata to make sure that it's accurately surfacing intent upfront so agents see all the content and context you've put the rest of your writing efforts into.

## What a schema actually enforces

Here's how these principles translate into a schema:

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

`title` and `description` are the retrieval signals. An agent decides whether this page is relevant to a user's question almost entirely on these two fields. "WebSocket Connection Guide" tells the agent what the page is called. "Step-by-step setup for real-time WebSocket connections in Acme API v2.0" tells the agent what the page does, for which product version, using which protocol. A description like "Learn about WebSockets" fails the retrieval test because it's accurate but useless as a signal.

`doc_type` maps to the Diátaxis content taxonomy with domain-specific additions such as:

- `how-to`
- `tutorial`
- `concept`
- `reference`
- `troubleshooting`
- `observability-status`
- `health-status`
- `release-notes`

This field gives the retrieval layer a filter it cannot infer from content alone. A user asking "why is my webhook not firing" should retrieve `troubleshooting` pages, not `how-to` pages about webhook setup, even though both will score high on keyword similarity. The `release-notes` type matters for a different reason: tagging changelogs explicitly lets you exclude them from certain retrieval contexts, so an agent doesn't cite a changelog entry as authoritative product guidance.

`context` is the trust boundary field: `end-user | admin`. It enforces the split between surfaces accessible to end users and surfaces only admins can reach. An agent retrieving admin configuration documentation for an end-user query can be a product risk. This field makes that boundary machine-enforceable rather than a convention that depends on someone remembering to check.

`domain` drives sidebar routing: `platform | api-reference | sdk`. It belongs in frontmatter rather than purely in build config because agents navigating the content can use it to understand which documentation area they're in and filter accordingly. A field that only exists in the build system is invisible to anything consuming the raw Markdown.

`prerequisites` is the field most documentation schemas leave out. For a human reader, a "Before you begin" section at the top of a page serves the same purpose. It relies on the reader noticing it, parsing it, and deciding whether they've met the conditions; an agent can't reliably infer this intent. When you declare prerequisites in frontmatter as a structured list, the agent wires the dependency chain directly into its retrieval workflow, so it will fetch the required context before it ever surfaces the current page.

## Two decisions that look small but aren't

`last_updated` is deliberately absent from frontmatter. A manually maintained timestamp drifts from the moment someone forgets to update it on a minor edit. Stale timestamps are worse than none, so avoid this convention. Instead, update your pipeline to inject the date at build time using a remark plugin that reads the git commit timestamp for each file. This process ensures that the data is always accurate and it removes a maintenance burden from contributors.

The schema is enforced via `frontmatter.schema.json` with `additionalProperties: false`. That last constraint is the one that matters most in practice. It ensures that a PR doesn't introduce an unrecognized field. `additionalProperties: false` means any unrecognized field fails the PR. It's a best practice to keep undocumented metadata from reaching production.

## Why this is an engineering decision

The standard objection to strict schema enforcement is that it creates friction for contributors. That's true, but with the prevalence of LLMs reading documentation to complete work, I think it's worth accepting. Yes it adds developing/writing time, but the alternative is a content corpus where metadata drift accumulates silently. Carey's [ecosystem-scale analysis of 673 Agent Skills](https://dacharycarey.com/2026/02/13/agent-skill-analysis/) across 41 repositories, including Anthropic's own published skills, found that 22% fail structural validation, with broken internal links and description fields that provide no useful activation context as the dominant failure modes. The lesson extends directly to documentation frontmatter: if the people who wrote the spec ship artifacts that don't pass their own validator, the gap between spec-as-written and spec-as-practiced closes through tooling enforcement.

The schema is the formal contract between the content and the systems that consume it. Enforcing it on every PR is the same discipline as enforcing a database schema migration. Schema changes should never reach production undocumented because the downstream consequences are harder to fix than the upfront friction of doing it right.

The best technical writers have always been subject matter experts in one thing engineers aren't: how a reader arrives at a page, what they already know, and what they need next. This skill is important and expansive in an agentic world. The agent coming to your documentation in this new era is trying to understand everything it can about your content before it acts; a well-formatted schema, shall we call it a formatted-for-the-machine-schema is how you brief it. A technical writer who thinks carefully about doc_type, context, prerequisites, and description is acting as the subject matter expert for every agent that will ever consume that article. That's a bigger job than it used to be. It's also a more important one.