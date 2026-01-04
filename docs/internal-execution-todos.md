# Internal Execution TODOs (Engineering + Infra)

## BEFORE (Discovery + Safety)

1) **Category:** tech
   - **Description:** Audit API routes for RLS/session context mismatch.
   - **Why it matters:** API routes currently use `createServerClient()` (anon session), which can block data under RLS or expose inconsistent access.
   - **Suggested approach:** decide whether API routes should use service role + explicit user scoping or inject authenticated context via JWT.
   - **Code pointers:** `app/api/projects/route.ts`, `lib/api/auth.ts`, `lib/supabase/server.ts`.
   - **Priority:** P0
   - **Effort:** M

2) **Category:** infra
   - **Description:** Document Supabase limits + backup plan.
   - **Why it matters:** Free tier can silently cap storage or compute.
   - **Suggested approach:** add runbook in docs + manual export routine.
   - **Code pointers:** `scripts/*.sql`, `types/supabase.ts` (schema reference).
   - **Priority:** P1
   - **Effort:** S

3) **Category:** security
   - **Description:** Review admin impersonation for auditability.
   - **Why it matters:** Impersonation affects trust and compliance.
   - **Suggested approach:** add logging/audit trail on impersonation start/stop.
   - **Code pointers:** `app/actions/impersonation-actions.ts`, `lib/supabase/server.ts`.
   - **Priority:** P1
   - **Effort:** S–M

4) **Category:** product
   - **Description:** Validate core personas (consultants, support, client users).
   - **Why it matters:** Roadmap should match actual usage.
   - **Suggested approach:** interview 3–5 delivery leads + reviewers.
   - **Code pointers:** UI flows in `app/*` for referencing today’s workflow.
   - **Priority:** P1
   - **Effort:** M

5) **Category:** infra
   - **Description:** Document current deployment flow (Vercel auto-builds, env var ownership).
   - **Why it matters:** No CI workflows are present; ops ownership must be explicit.
   - **Suggested approach:** record deploy steps, Vercel project settings, and env var owners.
   - **Code pointers:** `env.local.example`, `.github/` (no workflows present).
   - **Priority:** P1
   - **Effort:** S

---

## DURING (Implementation)

1) **Category:** tech
   - **Description:** Add assignee + SLA fields to issues.
   - **Why it matters:** Delivery teams need ownership and response targets.
   - **Suggested approach:** update schema, server actions, UI forms and list views.
   - **Code pointers:** `types/supabase.ts`, `app/actions/issue-actions.ts`, `components/create-issue-dialog.tsx`, `components/issue-details-dialog.tsx`.
   - **Priority:** P1
   - **Effort:** M

2) **Category:** product
   - **Description:** Build a minimal reporting view (issue counts by status/component/region).
   - **Why it matters:** Provides immediate delivery insight without heavy analytics.
   - **Suggested approach:** add a small dashboard component to project page.
   - **Code pointers:** `app/projects/[id]/page.tsx`, `components/issue-list.tsx`.
   - **Priority:** P2
   - **Effort:** M

3) **Category:** UX
   - **Description:** Add lightweight activity log per issue.
   - **Why it matters:** Users need visibility into recent updates without heavy workflow.
   - **Suggested approach:** append simple timeline entries on status changes + comment creation.
   - **Code pointers:** `app/actions/issue-actions.ts`, `app/actions/comment-actions.ts`.
   - **Priority:** P2
   - **Effort:** M

4) **Category:** security
   - **Description:** Implement request throttling for API keys.
   - **Why it matters:** Protects free-tier resources.
   - **Suggested approach:** add per-minute/per-hour throttling in API routes.
   - **Code pointers:** `lib/api/auth.ts`, `app/api/**/route.ts`.
   - **Priority:** P1
   - **Effort:** S–M

---

## AFTER (Scale + Differentiation)

1) **Category:** infra
   - **Description:** Decide on Supabase vs. RDS migration threshold.
   - **Why it matters:** cost and control tradeoffs grow over time.
   - **Suggested approach:** define trigger metrics + migration checklist.
   - **Code pointers:** `scripts/*.sql`, `lib/supabase/*`.
   - **Priority:** P2
   - **Effort:** M

2) **Category:** product
   - **Description:** Add phase-awareness (UAT, pre-go-live, post-go-live).
   - **Why it matters:** ERP delivery has phase-specific priorities and risks.
   - **Suggested approach:** add `phase` column + UI filter + reporting.
   - **Code pointers:** `types/supabase.ts`, `components/issue-list.tsx`.
   - **Priority:** P2
   - **Effort:** M

3) **Category:** tech
   - **Description:** Add multi-tenant org support.
   - **Why it matters:** enables monetization beyond single customer usage.
   - **Suggested approach:** introduce `organizations` table + project ownership.
   - **Code pointers:** `types/supabase.ts`, `app/actions/project-actions.ts`.
   - **Priority:** P3
   - **Effort:** L–XL

---

## Separate Lists

### Quick wins
- Add admin-visible audit trail for impersonation.
- Improve API error messages for RLS failures.
- Add basic project-level summary counts.

### Risky changes
- Replacing Supabase Auth with custom auth.
- Moving from Vercel Blob to S3 without migration plan.
- Reworking RLS policies without full test coverage.

### Product unknowns to validate with users
- Do clients want direct access or only internal delivery teams?
- Is component + region enough metadata, or is environment needed (UAT/Prod)?
- Do delivery teams want email notifications or Slack alerts?

### Infra prerequisites
- Define backup + restore procedure for Supabase.
- Confirm traffic + storage growth assumptions.
- Document Route53 + Vercel routing ownership.
