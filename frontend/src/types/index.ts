import { z } from "zod";

export const contactFormSchema = z.object({
     firstName: z.string().min(1, "First name is required").max(50),
     lastName: z.string(),
     email: z.string().email("Email is required"),
     phoneNumber: z.string().min(1, "Phone number is required"),
     company: z.string().min(1, "Company name is required"),
     jobTitle: z.string().min(1, "Job title is required")
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

export interface Contact {
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     phoneNumber: string;
     company: string;
     jobTitle: string;
}