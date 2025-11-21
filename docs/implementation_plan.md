# Codebase Analysis & Improvement Plan

## Goal Description
Analyze the `weco-issue-tracker` codebase to understand its functionality, determine local development requirements, and propose improvements for robustness, type safety, and testing.

## Local Development Requirements

To run this project locally, you need:

1.  **Node.js**: Version 18+ (Verified: [User's Node Version])
2.  **Environment Variables**: Create a `.env.local` file with:
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   `SUPABASE_SERVICE_ROLE_KEY`
    *   `BLOB_READ_WRITE_TOKEN`
3.  **Supabase Project**:
    *   **Existing Project**: Since the database already exists, you will need to retrieve the project URL and API keys from your Supabase dashboard.
    *   **Database Setup**: Verify if the tables (`projects`, `issues`) already exist. If not, run `scripts/create-bug-tracker-tables.sql`.
4.  **Vercel Blob**:
    *   Set up a Vercel Blob store and get the token.

## Codebase Insights

*   **Architecture**: Next.js 16 App Router with Server Actions.
*   **Database**: Supabase (PostgreSQL) with RLS enabled but currently set to "allow all".
*   **Storage**: Vercel Blob for screenshots.
*   **Styling**: Tailwind CSS 4 + shadcn/ui.
*   **State/Validation**: `react-hook-form` and `zod` are installed, but Server Actions currently lack strict Zod validation.

## Proposed Improvements

### 1. Type Safety & Validation
*   **Generate Supabase Types**: Use Supabase CLI to generate TypeScript definitions for the database schema to ensure type safety across the app.
*   **Zod Validation**: Implement `zod` schemas for all Server Actions to validate input before processing.

### 2. Testing Infrastructure
*   **Unit/Integration Tests**: Add `vitest` and `@testing-library/react` to test components and utilities.
*   **E2E Tests**: Consider Playwright for critical flows (creating issues).

### 3. Security & Robustness
*   **RLS Policies**: Refine RLS policies to be more secure (e.g., restrict updates/deletes if needed, though "allow all" might be intended for this specific internal tool).
*   **Error Handling**: Standardize error handling in Server Actions.

### 4. CI/CD
*   **GitHub Actions**: Add a workflow to run linting and type checking on pull requests.

### 5. Documentation (README.md)
*   **Component Diagram**: Add a Mermaid.js diagram visualizing the relationship between `app` (pages/actions), `components`, `lib` (Supabase client), and external services (Supabase DB, Vercel Blob).
*   **Configuration**: Add a detailed table explaining each environment variable and its purpose.

## Verification Plan

### Automated Tests
*   Run `npm run lint` to check for code style issues.
*   (Future) Run `npm test` once testing infrastructure is set up.

### Manual Verification
1.  **Setup**: Configure `.env.local` and run `npm run dev`.
2.  **Flow**:
    *   Create a project.
    *   Create an issue with a screenshot.
    *   Update issue status.
    *   Verify data persists in Supabase.

## Phase 2: Authentication & Collaboration

### Goal
Enable user identification and collaboration through comments and issue resolution tracking.

### 1. Authentication (Supabase Auth)
*   **Auth Pages**: Create `/login` and `/signup` pages.
*   **Middleware**: Add `middleware.ts` to manage sessions and protect routes.
*   **User Context**: Update the app to be aware of the logged-in user.

### 2. Database Schema Updates
*   **Comments Table**:
    *   `id` (UUID)
    *   `issue_id` (UUID, FK to issues)
    *   `user_id` (UUID, FK to auth.users)
    *   `content` (TEXT)
    *   `created_at` (TIMESTAMPTZ)
*   **Profiles Table** (Optional but recommended): To store user display names/avatars.

### 3. UI/UX Changes
*   **Issue Details**: Add a "Discussion" section.
*   **Resolution**: Add a way to mark an issue as resolved with a closing comment.

## Phase 3: Roles & Permissions (RBAC)

### Goal
Implement User, Support, and Admin roles to control access and functionality.

### 1. Database Schema
*   **Profiles Table**:
    *   `id` (UUID, FK to auth.users)
    *   `role` (ENUM: 'user', 'support', 'admin') - Default: 'user'
    *   `full_name` (TEXT)
    *   `avatar_url` (TEXT)
*   **Triggers**: Auto-create profile on user signup.

### 2. RLS Policies
*   **Issues**:
    *   `user`: Create, View (own?), Comment.
    *   `support`: View All, Update Status, Comment.
    *   `admin`: Full access (Delete).

### 3. Admin UI
*   **Admin Dashboard**: `/admin` route (protected).
*   **User Management**:
    *   **List Users**: View all users and their roles.
    *   **Provision User**: Create new users directly (email + default password) without sending emails.
    *   **Manage Access**: Deactivate/Ban users.
    *   **Password Management**: Reset user passwords manually.
    *   **Force Reset**: Flag users to change password on next login (via `profiles.must_change_password`).

