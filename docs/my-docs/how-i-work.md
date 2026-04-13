---
title: How I work
sidebar_label: How I work
---

# How I work

I'm an enthusiastic, detail-oriented principal tech writer with extensive experience writing documentation.

I write about systems I use. Before documenting a Kubernetes configuration across different providers, I deployed the environment after configuring resources for it. While I'm documenting an API endpoint, I call it with my changes to read what end users read to ensure it looks and feels right and consistent. If you don't do this, you'll miss gaps that a user will encounter. This is why the procedures I write tend to work the first time.

## Documentation as a system

The best documentation has a sensible structure, a conversational tone, and a rules-based process for keeping it accurate as the product changes.

At Pega, I designed the GitHub structure for Kubernetes deployment runbooks across six environments: AKS (Azure Kubernetes Service), EKS (Elastic Kubernetes Service), GKE (Google Kubernetes Engine), OpenShift, TKGI (Tanzu Kubernetes Grid Integrated Edition), and Minikube. Each runbook followed a consistent model so developers with any platform experience could navigate directly to their environment without re-orienting. That structure is still in use today.

At Legion Intelligence, as the sole writer, I augment the help center as new features emerge or new sections become available in the UI. I work in a Docusaurus project managed in GitLab, with a branching workflow that supports multiple features in parallel. The process is repeatable, linear, and structured like this:

1. Create a feature branch off main.
2. Clone it locally in VS Code.
3. Draft, review local builds with an LLM-based edit, commit updates, and push to the repository.
4. Complete the final review with reviewers using a merge request (MR).
5. Set the MR to auto-merge and squash after CodeRabbit completes its testing and approves the pipeline run.

## AI as a workflow layer

I use Claude in two dedicated projects, each with a specific job.

### Drafting content project

I built the style guide from scratch at Legion Intelligence, drawing from industry-standard guides (Google, Kubernetes, Red Hat) and keywords pulled directly from the UI, then published it in Confluence so anyone on the team can reference it. I loaded it into a dedicated Claude project so every draft reflects a consistent voice, structure, and terminology baseline from the start. For new content with complex steps, I capture configuration workflows on video using Loom, run the transcript through the project to generate a first draft, then refine for technical accuracy. Wiring the style guide into the drafting workflow — rather than applying it manually after the fact — is one of the best ways I know to automate documentation consistency.

### Git workflow project

This project has a Git-savvy instruction set I created for troubleshooting build issues and walking through the branch/clone/commit/push/MR sequence when merge conflicts arise. I use it to troubleshoot, such as running `npm install` to align local builds with the latest package versions, so I don't have to pull in project engineers for build or Git questions. Having a repeatable checklist keeps me on top of my workflow when managing multiple feature branches simultaneously.
