import { Request, Response } from 'express'
import { prisma } from '../app';
import { addContactFormSchema, updateContactFormSchema } from '../types';

export async function addContact(req:Request, res: Response) {
     const result = addContactFormSchema.safeParse(req.body);
     if (!result.success) {
          res.status(411).json({ success: false, message: result?.error.issues[0].message || "Invalid input" });
          return;
     }
     const { firstName, lastName, email, phoneNumber, company, jobTitle } = result.data;
     try {
          const isExist = await prisma.contactInfo.findFirst({
               where: { email },
          });
          if (isExist) {
               res.status(411).json({ success: false, message: "Email is already present in contact information list" });
               return;
          }
          await prisma.contactInfo.create({
               data: {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    company,
                    jobTitle,
               }
          });
          res.status(200).json({ success: true, message: "Contact information successfully added" });
     } catch (error: any) {
          console.error(error);
          res.status(400).json({ success: false, message: JSON.stringify(error.message) || "Something went wrong"})
     }
}

export async function updateContact(req: Request, res: Response) {
     const id: string = req.params.id;
     const result = updateContactFormSchema.safeParse(req.body);
     if (!result.success) {
          res.status(411).json({ success: false, message: result?.error.issues[0].message || "Invalid input" });
          return;
     }
     const { firstName, lastName, email, phoneNumber, company, jobTitle } = result.data;
     try {
          const contact = await prisma.contactInfo.findFirst({
               where: { id }
          });
          if (!contact) {
               res.status(404).json({ success: false, message: "Contact Information not found" });
               return;
          }
          if (email !== contact.email) {
               const newEmailAlreadyExist = await prisma.contactInfo.findFirst({
                    where: { email },
               })
               if (newEmailAlreadyExist) {
                    res.status(411).json({ success: false, message: "New Email is already link with defferent contact information" });
                    return;
               }
          }
          await prisma.contactInfo.update({ 
               where: { id },
               data: {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    company,
                    jobTitle,
               }
          });
          res.status(200).json({ success: true, message: "Contact information updated successfully" });
     } catch (error: any) {
          console.error(error);
          res.status(400).json({ success: false, message: JSON.stringify(error.message) || "Something went wrong"})
     }
}

export async function fetchContactById(req:Request, res: Response) {
     const id: string = req.params.id;
     try {
          const contact = await prisma.contactInfo.findFirst({
               where: { id }
          });
          if (!contact) {
               res.status(404).json({ success: false, message: "Contact information not found"});
               return;
          }
          res.status(200).json({ success: true, contact });
     } catch (error: any) {
          console.error(error);
          res.status(400).json({ success: false, message: JSON.stringify(error.message) || "Something went wrong"})
     }
}

export async function fetchAllContacts(req:Request, res: Response) {
     const { sortby } = req.query;
     let orderBy: Array<Record<string, "asc"|"desc">> = [{ createdAt: "desc" }];
     switch (sortby) {
          case "name":
               orderBy = [{ firstName: "asc" }, { lastName: "asc" }];
               break;
          case "latest":
               orderBy = [{ createdAt: "desc" }];
               break;
          case "oldest":
               orderBy = [{ createdAt: "asc" }];
               break;
     }
     try {
          const contacts = await prisma.contactInfo.findMany({ orderBy });
          res.status(200).json({ success: true, contacts });
     } catch (error: any) {
          console.error(error);
          res.status(400).json({ success: false, message: JSON.stringify(error.message) || "Something went wrong"})
     }
}

export async function deleteContact(req: Request, res: Response) {
     const id: string = req.params.id;
     try {
          const contact = await prisma.contactInfo.findFirst({
               where: { id }
          });
          if (!contact) {
               res.status(404).json({ success: false, message: "Contact information not found" });
               return;
          }
          await prisma.contactInfo.delete({
               where: { id: contact.id }
          });
          res.status(200).json({ success: true, message: "Contact information successfully deleted" });
     } catch (error: any) {
          console.error(error);
          res.status(400).json({ success: false, message: JSON.stringify(error.message) || "Something went wrong"})
     }
}