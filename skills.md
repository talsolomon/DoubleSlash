# Agent Skills Library
_Skills are capabilities that agents can be assigned. This library is open-ended — new skills are added as they're defined or discovered._

## Schema
Each skill entry follows this format:
```
### [SKILL-NNN] Skill Name
**Category**: Research | Communication | Creation | Analysis | Coordination | Integration
**Description**: What this skill does in one sentence.
**Inputs**: What the agent needs to perform this skill
**Outputs**: What the agent produces
**Dependencies**: Other skills or tools required
**Loop-compatible**: Yes / No (can this skill run on a recurring schedule?)
**Human checkpoint required**: Yes / No
```

---

## Category: Research

### [SKILL-001] Web Research
**Category**: Research  
**Description**: Search the web for information on a given topic and return a structured summary.  
**Inputs**: Query or topic, scope (depth, recency, sources)  
**Outputs**: Summary document, source list  
**Dependencies**: Web search tool  
**Loop-compatible**: Yes  
**Human checkpoint required**: No

### [SKILL-002] Competitive Monitoring
**Category**: Research  
**Description**: Track a defined set of competitor products or market signals on a recurring schedule.  
**Inputs**: Competitor list, signal types (pricing, features, content)  
**Outputs**: Change log, summary report  
**Dependencies**: SKILL-001  
**Loop-compatible**: Yes  
**Human checkpoint required**: No (but escalates on significant changes)

---

## Category: Communication

### [SKILL-010] Send Message
**Category**: Communication  
**Description**: Send a message to a human or another agent via a configured channel (WhatsApp, Slack, email, Telegram).  
**Inputs**: Message content, recipient, channel  
**Outputs**: Delivery confirmation  
**Dependencies**: Channel integration configured for this agent  
**Loop-compatible**: Yes  
**Human checkpoint required**: No (unless message contains commitments or decisions)

### [SKILL-011] Summarize & Report
**Category**: Communication  
**Description**: Produce a summary of recent activity, decisions, or outputs and deliver it via the agent's preferred channel.  
**Inputs**: Activity log or document set, report format  
**Outputs**: Summary message or document  
**Dependencies**: SKILL-010  
**Loop-compatible**: Yes  
**Human checkpoint required**: No

---

## Category: Coordination

### [SKILL-020] Task Routing
**Category**: Coordination  
**Description**: Receive an incoming request and assign it to the correct agent or human based on skill match and availability.  
**Inputs**: Task description, team roster with skills  
**Outputs**: Assignment + confirmation  
**Dependencies**: Team configuration  
**Loop-compatible**: No  
**Human checkpoint required**: No (but escalates if no match found)

### [SKILL-021] Escalation
**Category**: Coordination  
**Description**: Detect when a task is blocked, ambiguous, or requires a decision above the agent's authority, and route to a human.  
**Inputs**: Task state, block reason  
**Outputs**: Escalation message via human's preferred channel  
**Dependencies**: SKILL-010  
**Loop-compatible**: No  
**Human checkpoint required**: Yes (by definition)

---

## Category: Creation

### [SKILL-030] Document Drafting
**Category**: Creation  
**Description**: Write a first-draft document (brief, spec, email, report) based on a prompt or template.  
**Inputs**: Topic, format, context documents  
**Outputs**: Draft document  
**Dependencies**: None  
**Loop-compatible**: No  
**Human checkpoint required**: Yes (before sending or publishing)

---

_More skills added as product and agent capabilities expand._
