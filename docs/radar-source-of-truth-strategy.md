# RADAR Source Of Truth Strategy

RADAR should use GitHub as the engineering evidence layer, not as a vague reference bucket.

The destination repository for RADAR is:

```txt
rajeshkamalwar/radar
```

The source of truth for accuracy will be a curated set of official repositories, official documentation repositories, mature open-source projects, API changelogs, and RADAR's own architecture decision records.

## Principles

1. Prefer official repositories and official documentation.
2. Prefer actively maintained projects with clear release history.
3. Prefer projects used in production by serious teams.
4. Verify behavior with tests, not assumptions.
5. Store product decisions as ADRs in RADAR.
6. Keep API behavior versioned and linked to source evidence.
7. Never copy code blindly from repositories.
8. Track licensing before reusing code or assets.

## Evidence Tiers

### Tier 1: Official Sources

Used for API behavior, platform rules, security requirements, and integration contracts.

Examples:
- Google Search Central documentation
- Google Search Console API documentation
- Google Business Profile API documentation
- Google Analytics Data API documentation
- OpenAI API documentation
- Next.js repository and docs
- React repository and docs
- PostgreSQL documentation
- ClickHouse documentation
- Temporal documentation
- OpenTelemetry documentation
- Kubernetes documentation
- GitHub REST/GraphQL API documentation

### Tier 2: Mature Open-Source Implementations

Used for architecture patterns, crawler behavior, queue handling, dashboard patterns, observability, and integration examples.

Examples:
- Next.js production examples
- Playwright examples
- Lighthouse/PageSpeed tooling examples
- OpenTelemetry collectors and SDKs
- Temporal samples
- ClickHouse examples
- PostgreSQL and pgvector examples
- OpenSearch/Elasticsearch clients

### Tier 3: Research And Benchmarks

Used for ranking models, prediction, sentiment, attribution, virality probability, and large-scale analytics choices.

Examples:
- Peer-reviewed papers
- Public benchmarks
- Reproducible ML repos
- Public datasets
- Vendor-neutral benchmark reports

### Tier 4: Community Intelligence

Used only as weak signal.

Examples:
- GitHub issues
- GitHub discussions
- Engineering blogs
- Reddit or forum discussions
- Hacker News discussions

Community sources can reveal real-world pain, but they should not define product behavior without verification.

## RADAR Internal Truth System

RADAR should maintain these files in its own repository:

```txt
docs/
  source-of-truth/
    official-sources.md
    open-source-references.md
    api-contracts.md
    integration-changelogs.md
    licensing-notes.md

  adr/
    0001-stack-selection.md
    0002-modular-monolith-first.md
    0003-temporal-for-durable-workflows.md
    0004-clickhouse-for-analytics-events.md
    0005-openai-responses-api-for-ai-brain.md
```

## Verification Workflow

Every major RADAR feature should follow this workflow:

1. Define the feature behavior.
2. Link official docs or authoritative GitHub repositories.
3. Write an ADR if the decision affects architecture.
4. Implement behind a testable interface.
5. Add unit/integration tests.
6. Add telemetry.
7. Add a changelog entry.
8. Add user-facing explanation if the feature affects client trust.

## Example: Google Business Profile Review Replies

Source evidence:
- Official Google Business Profile API docs
- API changelog
- OAuth scope documentation
- Review resource documentation

RADAR implementation:
- Fetch reviews through approved API access.
- Classify sentiment and risk.
- Draft reply.
- Auto-reply only if policy allows it.
- Escalate sensitive reviews.
- Store audit log.
- Track response time and sentiment trend.

## Example: AI RADAR Prompt Tracking

Source evidence:
- OpenAI API docs
- Public AI platform docs where available
- Search engine crawler documentation
- RADAR's own prompt test history

RADAR implementation:
- Store target prompts.
- Run scheduled visibility checks.
- Extract brand mentions, competitors, citations, sentiment, and factual accuracy.
- Keep screenshots or response snapshots where terms allow.
- Track changes over time.

## Non-Negotiable Rule

RADAR must separate:

- Verified facts
- Platform guidance
- Inferred signals
- Predictions
- Recommendations

The UI must show this distinction whenever client decisions depend on it.
