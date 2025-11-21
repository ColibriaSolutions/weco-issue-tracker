# Colibria Bug Tracker

A simple, elegant bug tracking application for managing projects and logging issues with screenshots.

![Colibria Logo](public/colibria-logo.png)

## Features

- **Project Management** - Create and organize multiple projects
- **Issue Tracking** - Log bugs with detailed descriptions
- **Screenshot Uploads** - Attach visual evidence to issues using drag-and-drop
- **Status Management** - Track issues through Open → In Progress → Closed
- **Priority Levels** - Mark issues as Low, Medium, High, or Critical
- **Clean UI** - Simple, professional interface with Colibria branding

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Supabase** - PostgreSQL database with Row Level Security
- **Vercel Blob** - Secure screenshot storage
- **Tailwind CSS** - Modern styling
- **shadcn/ui** - Beautiful UI components

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Vercel account (for Blob storage)

### 2. Install Dependencies

\`\`\`bash
npm install
# or
pnpm install
# or
yarn install
- `description` (TEXT) - Project description
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

### Issues Table
- `id` (UUID) - Primary key
- `project_id` (UUID) - Foreign key to projects
- `title` (TEXT) - Issue title
- `description` (TEXT) - Issue description
- `status` (TEXT) - open | in_progress | closed
- `priority` (TEXT) - low | medium | high | critical
- `screenshot_url` (TEXT) - URL to screenshot in Blob storage
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

## Authentication & Database Architecture

The application uses **Supabase Auth** for user management, which separates authentication credentials from application data.

### `auth.users` vs `public.profiles`
- **`auth.users`**: Managed by Supabase. Stores secure credentials (email, encrypted password, metadata). Not directly accessible via the API.
- **`public.profiles`**: A public table linked to `auth.users` via `id`. Stores application-specific user data:
    - `role`: 'user' | 'support' | 'admin'
    - `full_name`: Display name
    - `is_active`: Account status
    - `avatar_url`: Profile picture

### Row Level Security (RLS)
- **Profiles**: Publicly readable by authenticated users. Writable only by the user themselves (limited fields) or Admins.
- **Comments**: Readable by all. Writable only by the author.
- **Issues**: Readable by all (currently). Writable by authenticated users.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
