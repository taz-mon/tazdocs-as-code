# JVN Chatbot API: a documentation case study

This project demonstrates end-to-end API documentation: designing a working API, writing its OpenAPI specification, and publishing that specification as a styled reference inside a docs-as-code pipeline.

**What this shows**: I designed the JVN Chatbot API's behavior, built a working Node.js and Express backend for it, then wrote the OpenAPI 3.0 specification by hand against that running code rather than generating it speculatively. I used Redocusaurus to publish the spec as a branded API reference inside this Docusaurus site, matching the fonts and color system used across the rest of my documentation.

I learned a how to realistically document an API from state to finish, not one that I get from an engineering team: one with state, multiple endpoints, error conditions, and behavior that changes based on usage history, rather than a flat CRUD example. My documentation from this project includes:

- **[The API reference](/api/jvn-chatbot)** — This is the published OpenAPI specification, including every endpoint, request and response schema, and example payloads.
- **[Read my design notes](/docs/my-docs/jvn-personality-guide)** — This explores JVN's mood states, token economy, and birthday reset mechanic work, written for someone integrating against the API.

## The API for a chatbot persona

JVN (Johann von Neumann) is an application that mimics chatbot persona you interact with using an API. JVN gets pickier the more questions you ask him. You earn tokens by completing inspiration activities, then spend tokens asking JVN questions. The longer a session runs without keeping JVN entertained, the more tokens each question costs.

## Why I built it this way

Most portfolio API docs are written against someone else's spec or a hypothetical service. I wanted to document something I had to design first, so the documentation had to account for real edge cases (no tokens available, invalid input, server errors) instead of an idealized happy path.

I worked with Claude to scaffold the Express application, then worked with Claude again to extract an accurate OpenAPI specification from the running code. Writing the spec after the implementation, instead of before it, meant every example response in the documentation matches what the API actually returns.

## Publishing pipeline

The OpenAPI specification is authored in the [jvn-chatbot-api repository](https://github.com/taz-mon/jvn-chatbot-api), alongside the Express application it documents, then copied into this site to publish. The API reference is generated with [Redocusaurus](https://redocusaurus.vercel.app/docs/), which renders an OpenAPI 3.0 file as a styled reference page inside an existing Docusaurus site. The setup has three parts: install Redocusaurus as a plugin, point its configuration at the OpenAPI YAML file, and theme the output to match the surrounding site rather than Redoc's defaults.
