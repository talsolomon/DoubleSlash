# Skills Registry
_Skills that work natively inside Claude Code (and Codex). The native format is MCP (Model Context Protocol) — Claude Code installs an MCP server and it becomes a callable tool. DS-native skills are implemented as MCP servers and are the product's core IP._

---

## How skills work in Claude Code
- **MCP servers** = the primary skill format. Claude Code has native MCP support. Each server you install adds tools Claude can call.
- **Bash/CLI** = any shell command is a skill. Claude Code runs them directly.
- **Sub-agents** = spawn another Claude Code instance as a parallel worker.
- **HTTP calls** = any REST API is reachable via curl/fetch. External tools (n8n, Zapier) can be backends for a skill, not the skill itself.

---

## DS-Native Skills
_These don't exist in any OSS registry. They are the human-AI coordination primitives — the real IP of Duble//Slash. Implemented as MCP servers._

| ID | Skill | Description |
|---|---|---|
| DS-001 | Approval Request | Pause execution and surface a structured decision to a human via their preferred channel. Resumes when approved or rejected. |
| DS-002 | Human-in-the-Loop Pause | Stop a loop or workflow and wait for human confirmation before continuing. Configurable timeout. |
| DS-003 | Context Handoff | Package the current state, decisions made, and outputs — and hand off to another agent or human in a readable format. |
| DS-004 | Task Decompose | Break a complex task into a structured list of parallel sub-tasks and spawn sub-agents to handle each. |
| DS-005 | Parallel Fan-Out | Execute multiple Claude Code sub-agents in parallel and aggregate their results. |
| DS-006 | Loop Runner | Run any skill on a cron schedule with configurable frequency, off-condition, and escalation path. |
| DS-007 | Memory Write | Write a structured record to shared project memory so the team sees it in the UI. |
| DS-008 | Memory Read | Query shared project memory for context before starting a task. |
| DS-009 | Progress Broadcast | Send a status update across all configured team channels at a milestone. |
| DS-010 | Idempotency Guard | Prevent duplicate execution of a task using a key — safe for loop contexts. |
| DS-011 | Skill Suggest | Given a task description, suggest which skills from the registry are relevant. |
| DS-012 | // Router | Parse a `//` invocation, identify the target skill, and dispatch with the right context. |

---

## MCP Skills — From OSS Registry
_All installable as MCP servers into Claude Code. Sources: [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers), [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers), [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)._

### Communication
| Skill | MCP Server | OSS |
|---|---|---|
| Send/read Gmail | gmail-mcp (official) | Yes |
| Send/read Slack messages | slack-mcp (official) | Yes |
| Send Telegram message | telegram-mcp | Yes |
| Send WhatsApp message | whatsapp via Twilio | No (API key) |
| Send SMS (Twilio) | twilio-mcp | Yes |
| Microsoft Teams message | ms365-mcp | Yes |
| Discord send/read | discord-mcp | Yes |
| ntfy push notification | ntfy-mcp | Yes |
| LINE messaging | line-mcp (official) | Yes |

### Version Control & Development
| Skill | MCP Server | OSS |
|---|---|---|
| GitHub — full (PRs, issues, files, actions) | github-mcp (official, 80+ tools) | Yes |
| GitLab — MRs, pipelines, issues | gitlab-mcp | Yes |
| Git — local repo operations | git-mcp | Yes |
| Run Python code (sandboxed) | pydantic-ai/mcp-run-python | Yes |
| Run Node.js code (sandboxed) | node-code-sandbox-mcp | Yes |
| Run Bash commands | shell-mcp / DS-native | Yes |
| Docker — build, run, push | docker-mcp | Yes |
| Kubernetes — cluster operations | k8s-mcp (multiple impls) | Yes |
| Terraform | terraform-mcp-server (HashiCorp) | Yes |
| Pulumi | pulumi-mcp-server | Yes |
| Figma — read design context | figma-mcp (official) | Yes |
| VS Code dev tools | vscode-devtools-mcp | Yes |
| Postman API testing | postman-mcp | Yes |
| Jira | jira-mcp / atlassian-mcp | Yes |
| Linear | linear-mcp (official) | Yes |
| GitKraken | gitkraken-mcp (official) | Yes |

### Databases & Data
| Skill | MCP Server | OSS |
|---|---|---|
| PostgreSQL — query + schema | postgres-mcp (official) | Yes |
| SQLite | sqlite-mcp (official) | Yes |
| MySQL | mysql-mcp | Yes |
| MongoDB | mongodb-mcp / mongodb-lens | Yes |
| BigQuery | bigquery-mcp | Yes |
| Snowflake | snowflake-mcp | Yes |
| DuckDB | duckdb-mcp | Yes |
| Redis | redis-mcp (official) | Yes |
| Airtable | airtable-mcp | Yes |
| Neon (serverless Postgres) | neon-mcp (official) | Yes |
| Qdrant (vector DB) | qdrant-mcp (official) | Yes |
| Supabase | supabase-mcp | Yes |

### File System & Documents
| Skill | MCP Server | OSS |
|---|---|---|
| Local filesystem read/write | filesystem-mcp (official) | Yes |
| Google Drive | gdrive-mcp | Yes |
| Microsoft 365 files | ms365-mcp | Yes |
| Box | box-mcp (official) | Yes |
| AWS S3 | s3-mcp | Yes |
| PDF read/extract | pdf-mcp | Yes |
| DOCX read/edit | adeu-mcp (Word virtual DOM) | Yes |
| Excel/spreadsheet manipulation | excel-mcp | Yes |

### Search & Web
| Skill | MCP Server | OSS |
|---|---|---|
| Web search (Brave) | brave-search-mcp (official) | Yes |
| Web search (Exa) | exa-mcp (official) | Yes |
| Web search (Tavily) | tavily-mcp | Yes |
| Fetch URL content | fetch-mcp (official) | Yes |
| Browser automation (Playwright) | playwright-mcp (Microsoft official) | Yes |
| Browser automation (Puppeteer) | puppeteer-mcp (official) | Yes |
| Web scraping (Bright Data) | brightdata-mcp (official) | Yes |
| ArXiv research papers | arxiv-mcp | Yes |
| Google News | google-news-mcp | Yes |
| Wikipedia | wikipedia via fetch | Yes |

### Cloud Infrastructure
| Skill | MCP Server | OSS |
|---|---|---|
| AWS (full suite) | awslabs/mcp (official) | Yes |
| Cloudflare Workers/KV/R2/D1 | cloudflare-mcp (official) | Yes |
| Kubernetes (multiple) | k8s-mcp, kubectl-mcp | Yes |
| Terraform | terraform-mcp (HashiCorp official) | Yes |
| Pulumi | pulumi-mcp (official) | Yes |
| Docker | docker-mcp | Yes |
| Azure | azure-cli-mcp, azure-resource-graph-mcp | Yes |
| LocalStack (local AWS) | localstack-mcp (official) | Yes |

### Monitoring & Observability
| Skill | MCP Server | OSS |
|---|---|---|
| Sentry error tracking | sentry-mcp (official) | Yes |
| Grafana | grafana-mcp | Yes |
| Prometheus | prometheus-mcp | Yes |
| PagerDuty | pagerduty-mcp | No |
| Signoz | signoz-mcp (official) | Yes |
| Raygun | raygun-mcp (official) | Yes |
| VictoriaMetrics | victoriametrics-mcp (official) | Yes |
| SSL/domain monitor | sslmon-mcp | Yes |

### AI & ML
| Skill | MCP Server | OSS |
|---|---|---|
| OpenAI API | openai-mcp | Yes |
| Perplexity | perplexity-mcp | Yes |
| HuggingFace Spaces | huggingface-mcp | Yes |
| Ollama (local models) | ollama-bridge-mcp | Yes |
| Gemini | gemini-bridge-mcp | Yes |
| Image generation (Imagen 3) | imagen3-mcp | Yes |
| Image generation (DALL-E) | openai-gpt-image-mcp | Yes |
| ZenML MLOps pipelines | zenml-mcp (official) | Yes |
| Comet Opik LLM observability | opik-mcp (official) | Yes |
| LlamaCloud index | llamacloud-mcp | Yes |

### Project & Knowledge Management
| Skill | MCP Server | OSS |
|---|---|---|
| Notion | notion-mcp | Yes |
| Obsidian vault | obsidian-mcp | Yes |
| Confluence | atlassian-mcp | Yes |
| Todoist | todoist-mcp | Yes |
| Google Keep | google-keep-mcp | Yes |
| Apple Notes | apple-notes-mcp | Yes |
| Slite | slite-mcp | Yes |

### Finance & Payments
| Skill | MCP Server | OSS |
|---|---|---|
| Stripe | stripe-mcp (official) | Yes |
| PayPal | paypal-mcp (official) | Yes |
| Chargebee | chargebee-mcp (official) | Yes |
| Real-time market data | octagon-mcp (official) | Yes |
| Crypto/DEX data | dexpaprika-mcp (official) | Yes |

### Location & Maps
| Skill | MCP Server | OSS |
|---|---|---|
| Google Maps | google-maps-mcp | Yes |
| IP geolocation | iplocate-mcp | Yes |

### Design & Creative (with external tool as backend)
| Skill | MCP Server | OSS |
|---|---|---|
| Figma read/write design | figma-mcp (official) | Yes |
| Blender control | blender-mcp | Yes |
| DaVinci Resolve video | davinci-resolve-mcp | Yes |
| Image generation (Flux, Seedream, etc.) | acedata-mcp-flux etc. | Yes |
| SVG generation | svgmaker-mcp | Yes |
| Mermaid diagrams | mermaid-mcp (multiple) | Yes |

### System & OS Automation
| Skill | MCP Server | OSS |
|---|---|---|
| Shell/bash execution | shell-mcp / DS-native | Yes |
| Apple Shortcuts | apple-shortcuts-mcp | Yes |
| Windows CLI (PowerShell, CMD) | windows-cli-mcp | Yes |
| Windows mouse/keyboard control | windows-control-mcp | Yes |

---

## External Tools as Skill Backends
_These are not MCP servers. A DS skill can call them via HTTP request from Claude Code, making them available as `//` commands. Not native — requires the user to have an existing account._

| Tool | How it's called | Coverage |
|---|---|---|
| n8n | HTTP webhook trigger | 1,759 workflow nodes |
| Zapier | HTTP webhook (Zap catch hook) | 8,000+ apps |
| Pipedream | HTTP trigger | 2,500 APIs, 8,000+ tools |
| Make (Integromat) | HTTP webhook | 1,000+ apps |

---

## Skills Scale Summary
| Source | Native to Claude Code? | Count |
|---|---|---|
| DS-native MCP skills | Yes (built by us) | 12 (growing) |
| OSS MCP servers | Yes (install + configure) | 1,000s |
| External via HTTP | Partial (user needs account) | 10,000s |
