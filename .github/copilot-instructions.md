# WECO Issue Tracker - AI Coding Agent Instructions

## Project Overview

Next.js 16 bug tracking system with role-based access control (RBAC), dual authentication (session + API keys), and project ownership model. Built on Next.js App Router, Supabase (PostgreSQL + Auth), and Vercel Blob for file storage.

## Architecture Patterns

### Dual Data Layer Architecture
- **Server Actions** (`app/actions/*.ts`): UI mutations with session auth, use `createServerClient()` for RLS-aware queries
- **API Routes** (`app/api/**/route.ts`): REST endpoints with API key auth via `requireApiKey()`, use `createServerClient()` (inherits API key context)
- **Admin Operations**: Use `createServiceRoleClient()` from `lib/supabase/admin.ts` to bypass RLS (e.g., user provisioning, API key management)

### Authentication Layers
1. **Session Auth** (UI): `proxy.ts` middleware checks `auth.uid()`, validates `profiles.is_active`, redirects to `/login` if missing
2. **API Key Auth** (REST API): `lib/api/auth.ts` validates Bearer tokens, updates usage counters, enforces rate limits
3. **Bypass**: API routes under `/api/*` skip session middleware (see `proxy.ts` line 39)

### Role-Based Access Control (RBAC)
Three roles in `profiles.role`: `user`, `support`, `admin`
- Check role in Server Actions: `profile?.role === 'admin'`
- RLS policies enforce read/write at DB level (see `scripts/*.sql`)
- Project ownership: `projects.owner_id` + `project_members` junction table for collaboration

### Type Safety
- **Database Types**: Auto-generated in `types/supabase.ts` via `pnpm run types` (Supabase CLI)
- **Input Validation**: All Server Actions use Zod schemas from `lib/validations.ts` (e.g., `createIssueSchema.safeParse()`)
- **Type Imports**: Import `Database` type for typed Supabase clients

## Critical Workflows

### Database Schema Management
1. Run SQL migrations in order (see `README.md` step 4):
   - `create-profiles-table.sql` → `create-comments-table.sql` → `add-comment-attachments.sql` → `add-project-ownership.sql` → `create-api-keys-table.sql`
2. After schema changes: `pnpm run types` to regenerate `types/supabase.ts`
3. RLS policies use `auth.uid()` for session context, not API key context

### Cache Revalidation
Always call `revalidatePath()` after mutations:
- Broad paths for list views: `revalidatePath('/')` or `revalidatePath('/projects')`
- Specific paths for detail views: `revalidatePath(\`/projects/${projectId}\`)`
- Layout revalidation for auth changes: `revalidatePath('/', 'layout')`

### File Upload Pattern
1. Upload to Vercel Blob via `uploadScreenshot()` in `issue-actions.ts`
2. Store URL in DB (`screenshot_url`, `attachment_url`)
3. Configured for 50MB limit in `next.config.mjs` → `experimental.serverActions.bodySizeLimit`

### Admin User Provisioning
- Admins create users via `admin-actions.ts` → `createUser()` using service role client
- Sets `email_confirm: true` to bypass email verification (no quota consumed)
- New users get `must_change_password: true` flag in `profiles` table
- First login forces password reset flow

## Project-Specific Conventions

### Error Handling
Server Actions return `{ error: string | Record<string, string[]> }` on failure, `{ data: T }` on success. Never throw errors to client.

### Supabase Client Selection
```typescript
// UI Server Actions - respects RLS
const supabase = await createServerClient()

// Admin operations - bypasses RLS
const supabase = createServiceRoleClient()
```

### Component Structure
- Server Components fetch data directly (no client state)
- Client components in `components/` use `'use client'` directive
- Dialogs use Radix UI primitives from `components/ui/`

### API Documentation
OpenAPI spec auto-generated at `/api/openapi.json` and `/api/openapi.yaml` from `lib/api/openapi-spec.ts`. Swagger UI available at `/api-docs`.

## Development Commands

```bash
pnpm install          # Install dependencies (uses pnpm, not npm)
pnpm run dev          # Start dev server (Next.js 16)
pnpm run build        # Production build
pnpm run types        # Regenerate Supabase types
pnpm run lint         # ESLint check
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (RLS enforced)
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key (bypasses RLS, server-only)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `NEXT_PUBLIC_APP_URL` - App base URL (for OpenAPI spec)

## Key Integration Points

### Supabase Realtime (Comments)
Comments table has realtime enabled (`enable-realtime-comments.sql`). Clients can subscribe to updates via `supabase.channel('comments').on('postgres_changes', ...)`.

### Vercel Analytics
Integrated via `@vercel/analytics/next` in `app/layout.tsx`. No configuration needed.

### Foreign Key Cascades
- `issues.project_id` → CASCADE delete when project deleted
- `project_members.project_id` → CASCADE delete
- `comments.issue_id` → CASCADE delete (see `fix-comments-foreign-key.sql`)

## Common Pitfalls

1. **Don't use service role in Server Actions** - Exposes admin privileges to client. Use regular `createServerClient()` unless explicitly needed.
2. **Always validate input** - Even Server Actions need Zod validation (client-side validation can be bypassed).
3. **Middleware conflicts** - API routes (`/api/*`) skip session checks. Don't add session logic to API route handlers.
4. **RLS recursion** - Avoid circular policy dependencies (see `fix-recursive-policies.sql` for examples).
5. **Type imports** - Import types from `@/types/supabase`, not direct Supabase client types.
