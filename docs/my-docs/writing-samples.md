---
title: Writing samples
sidebar_label: Writing samples
---

# Writing samples

These examples demonstrate my technical writing across docs-as-code workflows, 
AI-assisted documentation pipelines, open-source tooling, and enterprise 
infrastructure. Original work appears first; employer samples follow as 
supporting context.

---

## Docs-as-code architecture and AI-assisted pipelines

### AI-augmented documentation pipeline (Jupyter notebook)

A fully executable portfolio artifact demonstrating a three-phase documentation 
quality pipeline built on this Docusaurus site. The notebook runs LLM-as-a-judge 
evaluation against real content using the Anthropic API, computes weighted quality 
scores, and validates the site for agent-friendly consumption.

Two versions available — Anthropic SDK (`claude-sonnet-4-6`) and OpenAI SDK 
(`gpt-4o`) — demonstrating the same pipeline architecture across providers.

**[View on GitHub — Anthropic version](https://github.com/taz-mon/tazdocs-as-code/blob/main/notebooks/vectorlint-pipeline-demo-anthropic.ipynb)**  
**[View on GitHub — OpenAI version](https://github.com/taz-mon/tazdocs-as-code/blob/main/notebooks/vectorlint-pipeline-demo-openai.ipynb)**

### Blog: Making documentation pipelines LLM-friendly

A practitioner-voice article on what it means to treat documentation as an 
engineering problem — covering deterministic linting, LLM-based prose review 
with VectorLint, agent-readiness validation with `afdocs`, and the governance 
layer that keeps AI contributor tools aligned with project standards.

**[Read the post](/blog/ai-aware-doc-pipelines)**

---

## Open-source project documentation

### VectorLint

I created documentation for VectorLint to contribute, an open-source LLM-based prose linter that 
enforces style guides using an LLM-as-a-Judge approach. My proposed docs include:
- Quickstart and Installation How-tos
- A tutorial for running VectorLint iterating your style rules depending on your findings 
- Rule pack authoring for advanced style rule configuration
- CI integration and quality scoring How-tos
I wrote these articles in coordination with the project lead, using MDX on Mintlify, a common toolchain at developer-tool companies.

**[My proposed VectorLint documentation](https://vectorlint.mintlify.app/introduction)**

---

## API documentation

### JVN Chatbot API

End-to-end API documentation for a Node.js/Express chatbot API I built as a 
portfolio project. Includes a full OpenAPI 3.0 specification and interactive 
documentation integrated into this Docusaurus site via Redocusaurus 2.5.0, 
enabling inline endpoint validation.

**[API reference](/api/jvn-chatbot)**  
**[JVN overview](/docs/my-docs/jvn-intro)**

---

## Enterprise infrastructure samples

The following samples are from my nine years at Pegasystems documenting 
Kubernetes deployments, database configurations, Kafka data streams, and 
Pega Cloud security. They demonstrate scope and technical depth across 
complex enterprise systems.

Note: these links point to Pegasystems' live documentation. Content may 
have been updated since my departure in August 2025.

### Kubernetes and deployment

Helm-based runbooks supporting Ubuntu Linux and PowerShell commands, 
covering Azure AKS, AWS EKS, Google GKE, and Red Hat OpenShift deployments:  
**[Pega Helm Charts documentation](https://github.com/pegasystems/pega-helm-charts/tree/master/docs)**

Deploying external Hazelcast on a VM cluster with Docker — demonstrates 
writing for an audience configuring encrypted inter-server authentication:  
**[Deploying external Hazelcast on a VM cluster](https://docs.pega.com/bundle/platform-241/page/platform/deployment/externalization-of-services/deploy-hz-vm-based-cluster-overview.html#install-deploy-connect-hazelcast-service-vm-based-cluster)**

### Database configuration

Setup guides covering Oracle, PostgreSQL, SQL Server, and DB2:  
**[Preparing your database for an installation](https://docs.pega.com/bundle/platform/page/platform/install/db/prepare-database-k8s.html)**

JDBC URL configuration for external relational database instances:  
**[Creating and updating external relational database instances with JDBC URLs](https://docs.pega.com/bundle/platform/page/platform/system-administration/database-instance-jdbc-external-creating.html)**

Proactive support article written to reduce ticket volume — explains which 
duplicate key errors are benign and when to open a ticket:  
**[Reviewing duplicate key value errors](https://docs.pega.com/bundle/platform/page/platform/system-administration/review-duplicate-key-value-errors.html)**
