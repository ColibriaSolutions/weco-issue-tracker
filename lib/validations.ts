import { z } from 'zod'

export const createIssueSchema = z.object({
    projectId: z.string().uuid(),
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    screenshotUrl: z.string().url().nullable().optional(),
})

export const updateStatusSchema = z.object({
    issueId: z.string().uuid(),
    status: z.enum(['open', 'in_progress', 'closed']),
})

export type CreateIssueInput = z.infer<typeof createIssueSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
