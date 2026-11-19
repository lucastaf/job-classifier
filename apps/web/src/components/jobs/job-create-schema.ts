import { z } from "zod";

export const jobSchema = z.object({
    title: z.string().min(1, "Title is required"),
    jobLink: z.string().min(1, "Job link is required"),
    description: z.string().min(1, "Job description is required"),
    rating: z.number("Rating is required").min(0).max(5),
    companyName: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    kanbanStatusId: z.number().nullable(),
    applicationDate: z.string()
});