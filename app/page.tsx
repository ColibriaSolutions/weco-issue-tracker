import { ProjectList } from '@/components/project-list'
import { CreateProjectDialog } from '@/components/create-project-dialog'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your projects and track issues
              </p>
            </div>
            <CreateProjectDialog />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProjectList />
      </main>
    </div>
  )
}
