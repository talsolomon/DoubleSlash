# Agents Directory
_Each file in this directory defines one agent. Agents are the unit of work in Duble//Slash._

## Agent file format
```
# [Agent Name]
**Role**: One-line description of what this agent does
**Owner**: Human responsible for this agent
**Status**: Active | Paused | Draft

## Skills
- [SKILL-NNN] Skill Name
- ...

## Loop
- Frequency: [e.g., daily at 09:00, on-trigger, hourly]
- Off-condition: [when does this loop stop?]

## Communication
- Preferred channel: [WhatsApp / Slack / email / Telegram]
- Working hours: [e.g., Mon–Fri 09:00–18:00 UTC+3]
- Escalation contact: [human name or agent name]

## Scope
- Can do: [explicit list]
- Cannot do: [explicit list]
- Escalates when: [conditions]
```

---

No agents defined yet. Start by running the agent creation flow.
