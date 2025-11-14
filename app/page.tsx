import Image from 'next/image'
import { ProjectList } from '@/components/project-list'
import { CreateProjectDialog } from '@/components/create-project-dialog'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/colibria-logo.png"
                alt="Colibria"
                width={180}
                height={50}
                priority
                className="h-12 w-auto"
              />
            </div>
            <CreateProjectDialog />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and track issues
          </p>
        </div>
        <ProjectList />
      </main>
    </div>
  )
}
