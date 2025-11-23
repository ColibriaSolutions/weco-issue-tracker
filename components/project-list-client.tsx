'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
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
import { deleteProject, deleteMultipleProjects } from '@/app/actions/project-actions'
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
    const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set())
    const [deleting, setDeleting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const selectableProjects = projects.filter(p => isAdmin || p.owner_id === currentUserId)
    const allSelected = selectableProjects.length > 0 && selectedProjects.size === selectableProjects.length
    const someSelected = selectedProjects.size > 0

    function toggleSelectAll() {
        if (allSelected) {
            setSelectedProjects(new Set())
        } else {
            setSelectedProjects(new Set(selectableProjects.map(p => p.id)))
        }
    }

    function toggleProject(projectId: string) {
        const newSelected = new Set(selectedProjects)
        if (newSelected.has(projectId)) {
            newSelected.delete(projectId)
        } else {
            newSelected.add(projectId)
        }
        setSelectedProjects(newSelected)
    }

    function handleDeleteClick(e: React.MouseEvent, project: Project) {
        e.preventDefault()
        e.stopPropagation()
        setProjectToDelete(project)
        setDeleteDialogOpen(true)
    }

    function handleBulkDelete() {
        setProjectToDelete(null)
        setDeleteDialogOpen(true)
    }

    async function confirmDelete() {
        setDeleting(true)

        // Bulk delete if multiple selected, single delete otherwise
        const result = projectToDelete
            ? await deleteProject(projectToDelete.id)
            : await deleteMultipleProjects(Array.from(selectedProjects))

        setDeleting(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            const count = projectToDelete ? 1 : selectedProjects.size
            toast({
                title: 'Success',
                description: `${count} project${count > 1 ? 's' : ''} deleted successfully`,
            })
            setDeleteDialogOpen(false)
            setProjectToDelete(null)
            setSelectedProjects(new Set())
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
            {selectableProjects.length > 0 && (
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="select-all"
                            checked={allSelected}
                            onCheckedChange={toggleSelectAll}
                        />
                        <label
                            htmlFor="select-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Select all
                        </label>
                    </div>
                    {someSelected && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                            className="ml-auto"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete {selectedProjects.size} project{selectedProjects.size > 1 ? 's' : ''}
                        </Button>
                    )}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                    // Show delete button to admins or project owners
                    const canDelete = isAdmin || project.owner_id === currentUserId
                    const isSelected = selectedProjects.has(project.id)

                    return (
                        <div key={project.id} className="relative group">
                            {canDelete && (
                                <div
                                    className="absolute top-2 left-2 z-10"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleProject(project.id)}
                                        className="bg-background"
                                    />
                                </div>
                            )}

                            <Link href={`/projects/${project.id}`}>
                                <Card className={`hover:border-primary transition-colors cursor-pointer h-full ${isSelected ? 'border-primary' : ''}`}>
                                    <CardHeader className={canDelete ? 'pl-10' : ''}>
                                        <CardTitle>{project.name}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className={canDelete ? 'pl-10' : ''}>
                                        <p className="text-sm text-muted-foreground">
                                            Created {new Date(project.created_at).toISOString().split('T')[0]}
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
                        <AlertDialogTitle>
                            {projectToDelete ? 'Delete Project' : `Delete ${selectedProjects.size} Projects`}
                        </AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                {projectToDelete ? (
                                    <>
                                        <p>Are you sure you want to delete <strong>{projectToDelete.name}</strong>?</p>
                                        <p className="mt-4">This will permanently delete:</p>
                                        <ul className="list-disc list-inside mt-2">
                                            <li>The project</li>
                                            <li>All issues in this project</li>
                                            <li>All comments on those issues</li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <p>Are you sure you want to delete <strong>{selectedProjects.size} projects</strong>?</p>
                                        <p className="mt-4">This will permanently delete:</p>
                                        <ul className="list-disc list-inside mt-2">
                                            <li>All selected projects</li>
                                            <li>All issues in these projects</li>
                                            <li>All comments on those issues</li>
                                        </ul>
                                    </>
                                )}
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
                            {deleting ? 'Deleting...' : projectToDelete ? 'Delete Project' : `Delete ${selectedProjects.size} Projects`}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
