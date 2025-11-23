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

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) - Install with `npm install -g pnpm`
- Supabase account
- Vercel account (for Blob storage)

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd weco-issue-tracker
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ```

4. Run database migrations in Supabase SQL Editor
   - `scripts/create-profiles-table.sql`
   - `scripts/create-comments-table.sql`
   - `scripts/add-comment-attachments.sql`
   - `scripts/add-project-ownership.sql`
   - `scripts/create-api-keys-table.sql`

5. Start the development server
   ```bash
   pnpm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Package Manager

This project uses **pnpm** for faster, more efficient dependency management. Vercel will automatically detect and use pnpm when deploying.

**Common commands:**
```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run types        # Generate Supabase types
pnpm add <package>    # Add new package
```


## Architecture

### System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Browser]
        UI[Next.js UI Components]
    end
    
    subgraph "Application Layer"
        SSR[Server Components]
        SA[Server Actions]
        MW[Middleware]
    end
    
    subgraph "Data Layer"
        SB[(Supabase PostgreSQL)]
        VB[Vercel Blob Storage]
    end
    
    subgraph "Authentication"
        AUTH[Supabase Auth]
    end
    
    Browser --> UI
    UI --> SSR
    UI --> SA
    MW --> AUTH
    SA --> SB
    SA --> VB
    SSR --> SB
    AUTH --> SB
    
    style Browser fill:#e1f5ff
    style SB fill:#d4edda
    style VB fill:#fff3cd
    style AUTH fill:#f8d7da
```

### Database Schema

```mermaid
erDiagram
    auth_users ||--o| profiles : "id"
    profiles ||--o{ comments : "user_id"
    projects ||--o{ issues : "project_id"
    issues ||--o{ comments : "issue_id"
    
    auth_users {
        uuid id PK
        string email
        jsonb user_metadata
        timestamp created_at
    }
    
    profiles {
        uuid id PK,FK
        string role
        string full_name
        boolean is_active
        string avatar_url
        boolean must_change_password
        timestamp created_at
    }
    
    projects {
        uuid id PK
        string name
        text description
        timestamp created_at
        timestamp updated_at
    }
    
    issues {
        uuid id PK
        uuid project_id FK
        string title
        text description
        string status
        string priority
        string screenshot_url
        timestamp created_at
        timestamp updated_at
    }
    
    comments {
        uuid id PK
        uuid issue_id FK
        uuid user_id FK
        text content
        timestamp created_at
    }
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Page
    participant SA as Server Action
    participant SB as Supabase Auth
    participant MW as Middleware
    participant DB as Database
    
    rect rgb(240, 248, 255)
        Note over U,DB: User Signup Flow
        U->>L: Enter email, password, name
        L->>SA: signup(credentials)
        SA->>SB: auth.signUp()
        SB->>DB: Create auth.users record
        SB-->>DB: Trigger creates profiles record
        SB-->>SA: Return session
        SA-->>L: Redirect to /
    end
    
    rect rgb(255, 248, 240)
        Note over U,DB: Admin Creates User
        U->>SA: createUser(email, temp_password)
        SA->>SB: admin.createUser()
        Note right of SA: Uses service role key
        SB->>DB: Create auth.users (no email)
        SB->>DB: Create profiles (must_change_password=true)
        SB-->>SA: User created
        SA-->>U: Show credentials
    end
    
    rect rgb(240, 255, 240)
        Note over U,DB: Login Flow
        U->>L: Enter credentials
        L->>SA: login(email, password)
        SA->>SB: auth.signInWithPassword()
        SB-->>SA: Return session
        SA-->>L: Set cookie, redirect
        L->>MW: Navigate to protected route
        MW->>DB: Check profiles.is_active
        alt User is active
            MW-->>U: Allow access
        else User is inactive
            MW->>SB: Sign out
            MW-->>U: Redirect to login
        end
    end
```

### Role-Based Access Control (RBAC)

```mermaid
graph LR
    subgraph "Roles"
        USER[User]
        SUPPORT[Support]
        ADMIN[Admin]
    end
    
    subgraph "Permissions"
        VIEW_OWN[View Own Issues]
        COMMENT[Add Comments]
        VIEW_ALL[View All Issues]
        UPDATE_STATUS[Update Issue Status]
        MANAGE_USERS[Manage Users]
        MANAGE_ROLES[Assign Roles]
    end
    
    USER --> VIEW_OWN
    USER --> COMMENT
    
    SUPPORT --> VIEW_OWN
    SUPPORT --> COMMENT
    SUPPORT --> VIEW_ALL
    SUPPORT --> UPDATE_STATUS
    
    ADMIN --> VIEW_OWN
    ADMIN --> COMMENT
    ADMIN --> VIEW_ALL
    ADMIN --> UPDATE_STATUS
    ADMIN --> MANAGE_USERS
    ADMIN --> MANAGE_ROLES
    
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

### Admin User Provisioning & Email Quota

**Important:** When creating users via the Admin Dashboard, **no confirmation emails are sent** and **no email quota is consumed**.

- **Admin-created users** use `admin.createUser()` with `email_confirm: true`, bypassing the email system entirely
- Users can login immediately with the temporary password provided
- **Email quota only applies to:**
  - Public user signups (confirmation emails)
  - Password reset requests
  - Email change verifications

This means you can provision unlimited users through the Admin UI without worrying about Supabase's free tier email limits (3-4 emails/hour).

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
