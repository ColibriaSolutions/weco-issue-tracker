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
\`\`\`

### 3. Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token
\`\`\`

### 4. Database Setup

Run the SQL scripts in the `scripts` folder to create the necessary tables:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `scripts/create-bug-tracker-tables.sql`
4. Run the script

This will create:
- `projects` table - Stores project information
- `issues` table - Stores bug reports with screenshot URLs
- Indexes for optimal query performance

### 5. Run Development Server

\`\`\`bash
npm run dev
# or
pnpm dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your bug tracker.

## Usage

### Creating a Project

1. Click the "New Project" button on the home page
2. Enter a project name and description
3. Click "Create Project"

### Logging an Issue

1. Click on a project card to view its details
2. Click "Report Issue"
3. Fill in the issue details:
   - Title
   - Description
   - Priority level
   - Screenshot (optional - drag & drop or click to upload)
4. Click "Create Issue"

### Managing Issues

- Click on any issue card to view full details
- Update the status by clicking the status dropdown
- Issues are organized in columns by status (Open, In Progress, Closed)

## Project Structure

\`\`\`
├── app/
│   ├── actions/           # Server actions for database operations
│   ├── projects/[id]/     # Individual project pages
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/
│   └── supabase/         # Supabase client configuration
├── public/
│   └── colibria-logo.png # Brand logo
└── scripts/              # Database setup scripts
\`\`\`

## Database Schema

### Projects Table
- `id` (UUID) - Primary key
- `name` (TEXT) - Project name
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
