# RADAR Implementation Roadmap

## Build Strategy

RADAR should be built as a modular SaaS platform, not as a giant feature pile.

Start with one visible command center, then attach real engines behind it.

## Phase 0: Product Foundation

Status: started.

Deliverables:
- Master blueprint
- Source-of-truth strategy
- Next.js SaaS dashboard scaffold
- Executive RADAR screen
- Module data model
- Work ledger
- Approval queue
- Next-best action panel

## Phase 1: SaaS Foundation

Deliverables:
- Authentication
- Organizations
- Users
- Projects/websites
- RBAC
- Audit logs
- Activity timeline persistence
- PostgreSQL schema
- API service

Recommended stack:
- Next.js frontend
- NestJS API
- PostgreSQL
- Prisma or Drizzle
- Redis/BullMQ for early jobs

## Phase 2: Search RADAR V1

Deliverables:
- Website onboarding
- robots.txt fetch
- sitemap discovery
- page crawl
- metadata extraction
- schema detection
- broken link detection
- canonical checks
- basic technical SEO score
- recommendations

## Phase 3: AI RADAR V1

Deliverables:
- Brand/entity profile
- target prompt library
- AI answer monitoring
- competitor mention extraction
- citation extraction
- AI answer sentiment
- AI readiness score
- GEO recommendations

## Phase 4: Review And Local RADAR V1

Deliverables:
- Google Business Profile connection
- review ingestion
- sentiment scoring
- reply drafting
- risk rules
- approval workflow
- local visibility dashboard
- multi-location readiness

## Phase 5: Reputation RADAR V1

Deliverables:
- brand mention monitoring
- negative result detection
- sentiment dashboard
- crisis rules
- escalation workflows
- executive risk reporting

## Phase 6: Funnel RADAR V1

Deliverables:
- TOFU/MOFU/BOFU classification
- keyword-to-page mapping
- content gap detection
- lead-intent scoring
- revenue opportunity estimates
- prediction vs actual tracking

## Phase 7: Enterprise Readiness

Deliverables:
- SSO/SAML
- SCIM
- granular permissions
- legal/compliance queues
- data retention controls
- tenant isolation
- report scheduling
- API exports
- SLA monitoring
- SOC 2 readiness package

## Phase 8: Expansion RADARs

Deliverables:
- Social RADAR
- Influencer RADAR
- Trend RADAR
- Authority RADAR
- Competitor RADAR
- marketplace/ecommerce intelligence
- PR/media intelligence
- paid/organic intelligence

## Engineering Rule

Every RADAR module needs:
- its own score
- its own data sources
- its own alerts
- its own action rules
- its own approval logic
- its own report
- its own expert agent
- clear evidence for every recommendation
