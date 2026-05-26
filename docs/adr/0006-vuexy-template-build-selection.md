# ADR 0006: Vuexy Template Build Selection

## Status

Accepted

## Context

RADAR will use the local Vuexy admin template as the enterprise dashboard design foundation. The local template contains multiple framework builds:

- Angular deprecated
- ASP.NET Core
- Django
- HTML
- HTML + Laravel
- Next.js
- Nuxt
- Vue
- Vue + Laravel

RADAR is already planned as a TypeScript-first SaaS with a Next.js dashboard and separate backend/intelligence services.

## Decision

Use:

```txt
vuexy/nextjs-version/typescript-version/starter-kit
```

as the preferred product base.

Use:

```txt
vuexy/nextjs-version/typescript-version/full-version
```

as a local component and page reference library only.

## Rationale

The Next.js TypeScript starter kit is the best match because:

- It aligns with RADAR's existing Next.js and TypeScript direction.
- It includes the enterprise admin shell without unnecessary demo bloat.
- It uses MUI, which is strong for dense enterprise dashboards, tables, forms, permissions, dialogs, and workflows.
- It keeps the frontend separate from backend choices such as NestJS, FastAPI, Temporal, and ClickHouse.
- It is easier to harden for authentication, RBAC, audit logs, approvals, and multi-tenant SaaS behavior.

The full version should not become the product base because:

- It includes many demo apps, mock data, Prisma examples, and sample flows that RADAR does not need immediately.
- It increases dependency and cleanup burden.
- It makes it easier to accidentally ship template demo behavior.

## Rejected Options

### HTML / HTML + Laravel

Rejected because RADAR is not a PHP/Laravel monolith. These builds can still be used as visual references.

### Vue / Nuxt

Rejected because RADAR has already started on React/Next.js and the enterprise hiring/integration path is stronger there for this product.

### Django / ASP.NET Core

Rejected for the frontend base because RADAR's backend should be API/service-oriented, not tied to a server-rendered admin template.

### Angular Deprecated

Rejected because it is explicitly deprecated.

## Licensing Note

Do not commit the raw Vuexy template into the public RADAR repository unless the license explicitly permits public redistribution.

RADAR can:

- Use Vuexy locally as a design and implementation base.
- Commit original RADAR application code.
- Keep private licensed template assets out of the public repository if required by the license.
- Move the repository private before copying substantial template code, if the license requires it.

## Implementation Plan

1. Keep the current lightweight RADAR prototype for reference.
2. Create a Vuexy-based RADAR frontend branch.
3. Start from the TypeScript starter kit.
4. Remove generic template pages not needed for RADAR.
5. Build RADAR-specific navigation:
   - Executive RADAR
   - Search RADAR
   - AI RADAR
   - Reputation RADAR
   - Review RADAR
   - Local RADAR
   - Social RADAR
   - Influencer RADAR
   - Trend RADAR
   - Authority RADAR
   - Competitor RADAR
   - Funnel RADAR
6. Pull selected patterns from the full version:
   - analytics cards
   - CRM dashboard blocks
   - tables
   - calendar/workflow screens
   - roles and permissions screens
   - dialogs
7. Patch dependency audit issues before committing.
8. Verify with typecheck, build, and browser screenshots.
