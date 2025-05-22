---
title: "Vibe Coding is Great, but Orchestration Might Be Better"
date: 2025-05-22T14:00:00-05:00
author: d34d
topics: ["AI", "AI Agent", "Agents", "Concept", "DSL", "DSL Prompt Engineering", "MCO", "MCP", "Model Configuration Orchestration", "Multi-Agentic Orchestration", "NLP", "Orchestrator", "Prompt Engineering", "Prompt Language", "PromptLang", "Protocol", "Research", "Technical", "Vibe Coding"]
description: "🚀 Introducing the Model Configuration Orchestration (MCO) protocol! A standardized approach for AI agent orchestration"
slug: mco-protocol
featuredImage: "/images/articles/mco.jpeg"
draft: false

---

# Vibe Coding is Great, but Orchestration Might Be Better

Look, I get it. Vibe coding is awesome. I’ve spent countless nights telling Claude or GPT what I want, watching it spit out code, and feeling like a wizard. It’s democratized development in ways we couldn’t have imagined five years ago. But if you’ve tried building anything complex with multiple AI agents, you know the dirty secret - it gets messy fast.

After one too many late nights debugging inconsistent agent behaviors and watching my carefully crafted prompts fall apart, I decided there had to be a better way. That’s why I built the Model Configuration Orchestration (MCO) protocol.

### The Problem with Vibes

Don’t get me wrong - I love vibe coding for quick prototypes and one-off scripts. But when you’re trying to build something real, the problems start piling up:

```
•	You may frequently get different results
•	Your carefully crafted prompt from Tuesday is mysteriously “misunderstood” on Thursday
•	Coordinating multiple agents? Have fun with that back-and-forth
•	No understanding of the internal codebase logic

```

I hit this wall hard when building a research assistant that needed three specialized agents working together. The prompt engineering became more complex than the actual application logic. Each tweak to one agent would break another. It was madness.

### Back to Basics

I started thinking about what made traditional software development manageable - separation of concerns, declarative configs, clear interfaces. What if we applied those principles to agent orchestration, but kept it lightweight?
I started reading about prompt engineering and custom DSL programming languages, thinking of possibly combining them into a sort of promptlang. While looking for DSL’s I found inspiration in the Perchance DSL - a simple approach that separated core definitions from goals and styling. It was elegant in its simplicity.

So I stripped it down to its essence, changed the configuration for agentic AI, and rebuilt it as MCO - Model Configuration Orchestration, a protocol that focuses purely on orchestrating outcomes, not defining agents.

## How MCO Works

### MCO uses four simple file types:

```
project_name/
├── mco.app        # Core application definition
├── mco.sc         # Success criteria and goals
├── mco.features   # Optional features 
└── mco.styles     # Styling guide (for UI application)
```

Here’s a snippet from an `mco.app` file for a research assistant:

```
// --- mco.app --- 

@workflow "Research Assistant"
@description "A workflow for researching and summarizing information."

@ui_components:
  main:
    - input: { id: "topicInput", placeholder: "Enter research topic", bind: "topic" }
    - button: { id: "researchBtn", label: "Research", onClick: "startResearch" }
    - text: "Summary: {summary_text}"

@logic_flow:
  startResearch:
    - action: run_ai
      task: "research_topic"

@ai_tasks:
  research_topic:
    task: "web_research"
    prompt: "Research the topic {topic} and create a summary."
    output: summary_text
```

And the success criteria in `mco.sc`:

```
// --- mco.sc --- 

@goal
  "Create a comprehensive research summary that covers key concepts and recent developments."

@success_criteria
  - "The research includes information from at least 5 reputable sources."
  - "The summary covers the history, current state, and future trends."
  - "Technical concepts are explained in clear, accessible language."
```

That’s it. No complex agent definitions or framework-specific code. Just a clear declaration of what you want to happen.

### Why This Approach (in theory) Works

After fleshing out the MCO protocol and brainstorming how it would be used and implemented, I’ve found three major benefits, that on paper at least, point it its success:

- It’s Framework Agnostic
The same MCO files work whether you’re using LangChain, AutoGPT, or our own OpenAgent. The protocol doesn’t care about the underlying implementation - it just defines the orchestration.

This means you can switch frameworks without rewriting your entire application. I’ve migrated projects between three different frameworks with minimal changes.

- It’s Human AND Machine Readable
The syntax is simple enough that anyone can understand it at a glance, but structured enough for reliable parsing. This balance makes it ideal for both quick edits and programmatic generation.

The best part? You can add natural language context anywhere:

```
@ui_layout:
  description: "A simple layout with a header and main content area."
  > "The header should be sticky and contain the app title."
```

After each @definition you add to the syntax, there is an option to add further context to give the agent(s) by adding a “> “Line of natural language as further context in a text string like this.” 

So the correct way to configure the orchestration is by using the structured @data syntax definitions, in the way they are structured, because it is based off of best practices for software development, followed by an optional line of natural language to give it a bit more context specific to your internal vision and goal you wish the agents would produce. 

### The configuration syntax is not just willy-nilly

Each file is structured in a specific way, and each new definition builds onto the other, providing a progressive release of information, starting with the core vital aspects and building out to the smaller less vital features. Breaking up the configuration into multiple files allowed me to be able to orchestrate to the agents everything I wanted, without crafting an extremely long prompt and ending up going down a few rabbit trails, over describing certain features exactly how I wanted them to be made, causing the agents to forget some of the more core vital features of whatever I was “vibe coding”. 

Not only that, but with the multi-file approach, the .core and .sc (success criteria) files can be actually added to the persistent knowledge or context/memory of the agents, while the .features and .styles files are inserted into the agent loop/workflow strategically so that as the agents build and create based on how you have orchestrated them too, they will continue to loop through the features and styles, while the core and criteria for success will remain persistent in the agent’s context and memory. 

This gives you the best of both worlds - structure where it matters, flexibility where you need it, along with an iterative feedback loop and constant persistence of the core features. 

### What else:

- It Forces Clarity
By separating goals and success criteria from implementation details, MCO forces you to think clearly about what you’re trying to achieve. This alone has improved my results dramatically.

When I’m stuck, I often find it’s because I haven’t defined my success criteria well enough. MCO makes this obvious and fixable.

### Real-World Testing

I’m currently testing MCO with AgentGPT and Langchain, and a few custom frameworks. The results have been promising - we’ve seen more consistent outputs, easier debugging, and better collaboration between team members.

One unexpected benefit: onboarding new developers is much faster. They can understand the application’s intent and structure without diving into complex prompt chains or framework-specific code.

### Try It Yourself

MCO is intentionally simple. You don’t need any special tools to get started - just create the files and integrate them with your existing agent framework.

We’re working on adapters for popular frameworks, but the protocol is straightforward enough that you can implement it yourself in a few hours.

Check out the GitHub repo at ([MCO Protocol](http://github.com/paradiselabs-ai/MCO-protocol)) for examples and documentation.

### The Future of Agent Development

I believe we’re just scratching the surface of what’s possible with structured agent orchestration. As models become more powerful, the bottleneck shifts from capability to coordination.

MCO is my attempt to solve this coordination problem without overcomplicating things. It’s not perfect, but it’s a step toward more reliable, maintainable agent systems.

If you’re tired of prompt engineering hell and want to build something that actually works consistently, give MCO a shot. And if you have ideas for improving it, I’d love to hear them.

After all, I built this because I was frustrated. If you’ve felt that same frustration, maybe this can help.

*d34d is a co-founder and Lead Developer at ParadiseLabs, where he builds tools for AI orchestration and spends too much time debugging things that should just work, damnit. Follow ParadiseLabs on Twitter/X [@paradiselabs_ai](https://X.com/paradiselabs_ai) for more rants about AI development.*