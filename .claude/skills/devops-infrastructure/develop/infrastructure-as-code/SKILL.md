---
name: ds-devops-infrastructure-infrastructure-as-code
description: Designs infrastructure-as-code strategy, module structure, and state management approach. Use when codifying infrastructure, planning IaC adoption, or asking "how do we manage infrastructure like software". Also triggers on: IaC tool selection (Terraform/Pulumi/CDK), module structure design, state backend configuration, environment separation strategy, secret management integration, policy-as-code design.
tags: [devops-infrastructure, develop]
model: inherit
---

# Infrastructure as Code
**Domain**: DevOps/Infrastructure | **Phase**: Develop | **Invocation**: `/ds-devops-infrastructure-infrastructure-as-code`

## What this produces
An IaC design specification with tooling selection, module structure, state management approach, environment strategy, secret handling, testing strategy, and drift detection.

## Methods
IaC tool selection (Terraform/Pulumi/CDK), module structure design, state backend configuration, environment separation strategy, secret management integration, policy-as-code design, drift detection, IaC testing strategy, module versioning

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Tool + structure | Tool selection + module structure + state approach |
| Tuna | Full IaC spec | All above + environment strategy + secret management + naming conventions |
| Salmon | Production IaC | All above + policy-as-code + drift detection + testing strategy |
| Willy | IaC platform | All methods + full module catalog + migration plan + team onboarding guide |

---

## Execution Prompt

Read the project context: the infrastructure design from the Define phase, team skill set (Terraform familiarity, programming language preferences), existing tooling, cloud provider, compliance requirements, FISH classification.

---

### Step 1 — Tool Selection (all FISH levels)

IaC tool choice affects every engineer on the team. Choose based on team skills and infrastructure complexity.

**Tool comparison:**
| Tool | Language | Best for | Learning curve | Cloud support |
|---|---|---|---|---|
| **Terraform** | HCL (declarative) | Multi-cloud, large teams, mature ecosystem | Medium | All major clouds + 1000+ providers |
| **Pulumi** | TypeScript/Python/Go (general purpose) | Teams preferring real programming languages | Medium | All major clouds |
| **AWS CDK** | TypeScript/Python/Java | AWS-only teams, deep AWS services | Medium | AWS only |
| **AWS CloudFormation** | JSON/YAML (declarative) | AWS-native, no tooling install required | High | AWS only |
| **Ansible** | YAML (procedural) | Configuration management, not infra provisioning | Low | Multi-cloud + on-premise |
| **Crossplane** | Kubernetes CRDs | k8s-native infrastructure | High | Multi-cloud |

**Decision criteria:**
```
Multi-cloud or hybrid? → Terraform or Pulumi
Team writes TypeScript/Python/Go daily? → Pulumi (lower cognitive overhead)
Team prefers declarative, mature ecosystem? → Terraform
AWS-only, deep service integration needed? → CDK
Already k8s-native? → Crossplane
```

**Recommendation format:**
```
Selected tool: [Terraform / Pulumi / CDK]
Rationale: [team skills, cloud provider, complexity level]
Accepted limitations: [e.g., "HCL is not a real programming language — loops are limited"]
Migration path: [if switching from existing IaC tool]
```

---

### Step 2 — Module Structure Design (all FISH levels)

IaC without modules is a 5,000-line file nobody understands. Modules are the unit of reuse.

**Three-tier module structure:**
```
infrastructure/
├── modules/                    # Reusable building blocks (versioned)
│   ├── vpc/                    # VPC + subnets + routing
│   ├── ecs-service/            # ECS service + task definition + ALB
│   ├── rds-postgres/           # RDS instance + parameter group + replica
│   ├── redis-cluster/          # ElastiCache Redis
│   ├── s3-bucket/              # S3 with encryption, versioning, lifecycle
│   └── github-oidc-role/       # IAM role for GitHub Actions OIDC
├── environments/               # Environment-specific compositions
│   ├── production/
│   │   ├── main.tf             # Composes modules for prod
│   │   ├── variables.tf        # Prod-specific variables
│   │   └── terraform.tfvars    # Prod values (no secrets)
│   ├── staging/
│   └── development/
└── global/                     # Account-level, cross-environment resources
    ├── iam-roles/
    ├── dns/
    └── state-backend/
```

**Module design rules:**
- One module = one logical resource group (VPC, database, service)
- Modules are versioned with git tags — `ref=v1.2.0` in the module source
- No hardcoded values in modules — all configurable via variables
- Every module has `variables.tf`, `outputs.tf`, and `README.md`
- Modules are tested in isolation before environments use them

**Module interface format:**
```hcl
# modules/rds-postgres/variables.tf
variable "identifier" {
  description = "Unique identifier for this RDS instance"
  type        = string
}

variable "instance_class" {
  description = "RDS instance type (e.g., db.t3.medium)"
  type        = string
  default     = "db.t3.medium"
}

variable "multi_az" {
  description = "Enable Multi-AZ deployment for high availability"
  type        = bool
  default     = true  # Always true in production, false in dev
}

# modules/rds-postgres/outputs.tf
output "endpoint" {
  description = "Database connection endpoint"
  value       = aws_db_instance.this.endpoint
  sensitive   = true
}
```

---

### Step 3 — State Backend Configuration (all FISH levels)

Terraform state tracks what resources exist. Bad state management = dangerous apply operations.

**State backend design:**
```hcl
# Terraform: S3 backend with DynamoDB locking
terraform {
  backend "s3" {
    bucket         = "company-terraform-state-prod"
    key            = "services/api/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    kms_key_id     = "alias/terraform-state"

    # State locking — prevents concurrent applies
    dynamodb_table = "company-terraform-locks"
  }
}
```

**State file security:**
- State files contain sensitive data (DB passwords, private IPs) — encrypt at rest (KMS)
- Access to state bucket via IAM role, not user keys
- State file versioning enabled on S3 bucket (roll back corrupt state)
- DynamoDB lock table prevents concurrent `terraform apply` (prevents state corruption)

**State structure — one state file per environment per service:**
```
s3://company-terraform-state/
├── global/dns/terraform.tfstate
├── global/iam/terraform.tfstate
├── production/vpc/terraform.tfstate
├── production/api/terraform.tfstate
├── production/database/terraform.tfstate
├── staging/vpc/terraform.tfstate
└── staging/api/terraform.tfstate
```

**State isolation rules:**
- Production state MUST be in a separate AWS account from staging/dev
- No engineer has direct write access to production state — only CI/CD pipeline
- `terraform import` on production state requires two-person approval

---

### Step 4 — Environment Separation Strategy (Tuna, Salmon, Willy)

**Environment tiers:**
| Environment | Purpose | Who applies? | Approval required? | Identical to prod? |
|---|---|---|---|---|
| Development | Experimentation, feature work | Engineers directly | No | No (scaled down) |
| Staging | Pre-prod validation | CI/CD pipeline | No | As close as possible |
| Production | Live traffic | CI/CD pipeline only | Yes (2-person) | Definitive |

**Variable management per environment:**
```hcl
# environments/production/variables.tf
variable "instance_class" {
  default = "db.r6g.2xlarge"   # Prod: right-sized
}

# environments/staging/variables.tf  
variable "instance_class" {
  default = "db.t3.medium"     # Staging: cost-optimized
}
```

**Environment configuration rules:**
- No secrets in `terraform.tfvars` — use Secrets Manager or CI/CD secret injection
- Prod and staging use the same modules at the same version
- Dev may use module `latest` — staging and prod pin to a tagged version
- Never apply staging config to production — separate Terraform workspaces or directories

---

### Step 5 — Naming and Tagging Conventions (Tuna, Salmon, Willy)

Consistent naming enables cost allocation, incident response, and policy enforcement.

**Naming convention:**
```
Pattern: {environment}-{service}-{resource-type}
Examples:
  prod-api-ecs-cluster
  staging-payments-rds-primary
  prod-api-alb
  prod-shared-vpc
```

**Required tags on every resource:**
```hcl
locals {
  common_tags = {
    Environment = var.environment          # prod / staging / dev
    Service     = var.service_name         # api / payments / worker
    Team        = var.team_name            # platform / payments / growth
    ManagedBy   = "terraform"             # identify IaC-managed resources
    CostCenter  = var.cost_center          # for billing allocation
    Repository  = var.repository          # github.com/org/infra-repo
  }
}
```

**Cost allocation with tags:** enforce via AWS Tag Policy or policy-as-code that all resources have `Environment`, `Service`, `Team` tags. Untagged resources = unknown cost owner = waste.

---

### Step 6 — Policy-as-Code (Salmon, Willy)

Policy-as-code enforces infrastructure standards automatically — no manual security review for every PR.

**Open Policy Agent (OPA) / Sentinel policy examples:**
```rego
# Deny S3 buckets without encryption
deny[msg] {
  resource := input.resource.aws_s3_bucket[name]
  not resource.config.server_side_encryption_configuration
  msg := sprintf("S3 bucket '%s' must have server-side encryption enabled", [name])
}

# Deny RDS instances without Multi-AZ in production
deny[msg] {
  resource := input.resource.aws_db_instance[name]
  input.variables.environment == "production"
  not resource.config.multi_az
  msg := sprintf("RDS instance '%s' must be Multi-AZ in production", [name])
}

# Enforce required tags
deny[msg] {
  resource := input.resource[type][name]
  required_tags := {"Environment", "Service", "Team", "ManagedBy"}
  missing := required_tags - {k | resource.config.tags[k]}
  count(missing) > 0
  msg := sprintf("Resource '%s/%s' is missing tags: %v", [type, name, missing])
}
```

**Policy gate in CI pipeline:**
```
terraform plan → save plan file → run OPA/tfsec/checkov → block apply if any DENY
```

---

### Step 7 — IaC Testing Strategy (Salmon, Willy)

IaC without tests drifts silently. Test at three levels.

**Level 1: Static analysis (runs on every PR)**
- `terraform validate` — syntax and type checking
- `tflint` — linting and best practices
- `tfsec` / `checkov` — security misconfigurations
- `terraform fmt --check` — formatting consistency

**Level 2: Unit tests (module-level)**
```go
// terratest — test modules in isolation
func TestRDSModule(t *testing.T) {
  opts := &terraform.Options{
    TerraformDir: "../../modules/rds-postgres",
    Vars: map[string]interface{}{
      "identifier":     "test-db",
      "instance_class": "db.t3.micro",
      "multi_az":       false,
    },
  }
  defer terraform.Destroy(t, opts)
  terraform.InitAndApply(t, opts)

  endpoint := terraform.Output(t, opts, "endpoint")
  assert.NotEmpty(t, endpoint)
}
```

**Level 3: Integration tests (environment-level)**
- Full environment apply in ephemeral test account
- Smoke test the deployed infrastructure (can services reach each other?)
- Destroy after test (ephemeral environment, billed by the minute)

**Drift detection (production):**
```
Scheduled job (daily):
  terraform plan -out=drift.plan
  If drift.plan shows changes: alert on-call
  
Expected output: "No changes. Infrastructure is up-to-date."
Any non-zero plan output = someone changed infrastructure outside Terraform
```

---

### Final Output

**Tool selection** — with rationale and accepted limitations
**Module structure** — directory layout, module interfaces, versioning approach
**State backend configuration** — backend config, security controls, structure
**Environment strategy** — per-environment variable management, isolation rules (Tuna+)
**Naming and tagging conventions** — pattern, required tags, cost allocation (Tuna+)
**Policy-as-code rules** — OPA/Sentinel policies with deny conditions (Salmon+)
**Testing strategy** — static analysis + unit tests + integration tests + drift detection (Salmon+)
**Recommended next skill** — `/ds-devops-infrastructure-deployment-automation` — automate the deployment process that uses this IaC
