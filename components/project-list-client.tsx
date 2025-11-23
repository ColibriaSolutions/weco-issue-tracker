'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { deleteProject } from '@/app/actions/project-actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface Project {
    id: string
    name: string
    description: string | null
    created_at: string
    owner_id?: string | null
}

export function ProjectListClient({
    projects,
    isAdmin,
    currentUserId
}: {
    projects: Project[]
    isAdmin: boolean
    currentUserId: string
}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
    const [deleting, setDeleting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    function handleDeleteClick(e: React.MouseEvent, project: Project) {
        e.preventDefault()
        e.stopPropagation()
        setProjectToDelete(project)
        setDeleteDialogOpen(true)
    }

    async function confirmDelete() {
        if (!projectToDelete) return

        setDeleting(true)
        const result = await deleteProject(projectToDelete.id)
        setDeleting(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Project deleted successfully',
            })
            setDeleteDialogOpen(false)
            setProjectToDelete(null)
            router.refresh()
        }
    }

    if (projects.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground mb-4">No projects yet</p>
                    <p className="text-sm text-muted-foreground">
                        Create your first project to get started
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                    // Show delete button to admins or project owners
                    const canDelete = isAdmin || project.owner_id === currentUserId

                    return (
                        <div key={project.id} className="relative group">
                            <Link href={`/projects/${project.id}`}>
                                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                                    <CardHeader>
                                        <CardTitle>{project.name}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Created {new Date(project.created_at).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>

                            {canDelete && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity border-destructive hover:bg-destructive/10"
                                    onClick={(e) => handleDeleteClick(e, project)}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            )}
                        </div>
                    )
                })}
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                <p>Are you sure you want to delete <strong>{projectToDelete?.name}</strong>?</p>
                                <p className="mt-4">This will permanently delete:</p>
                                <ul className="list-disc list-inside mt-2">
                                    <li>The project</li>
                                    <li>All issues in this project</li>
                                    <li>All comments on those issues</li>
                                </ul>
                                <p className="mt-4"><strong>This action cannot be undone.</strong></p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            disabled={deleting}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            {deleting ? 'Deleting...' : 'Delete Project'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
