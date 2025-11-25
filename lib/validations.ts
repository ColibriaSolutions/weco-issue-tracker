import { z } from 'zod'

export const createIssueSchema = z.object({
    projectId: z.string().uuid(),
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    component: z.string().min(2, 'Component must be at least 2 characters'),
    region: z.string().min(1, 'Region is required'),
    screenshotUrl: z.string().url().nullable().optional(),
})

export const updateStatusSchema = z.object({
    issueId: z.string().uuid(),
    status: z.enum(['open', 'in_progress', 'closed']),
})

export type CreateIssueInput = z.infer<typeof createIssueSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
