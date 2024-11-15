import { z } from "zod";

export const addContactFormSchema = z.object({
     firstName: z.string().min(1, "First name is required").max(50),
     lastName: z.string(),
     email: z.string().email("Email is required"),
     phoneNumber: z.string().min(1, "Phone number is required"),
     company: z.string().min(1, "Company name is required"),
     jobTitle: z.string().min(1, "Job title is required")
});

export const updateContactFormSchema = addContactFormSchema.partial();