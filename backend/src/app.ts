import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
import contactRoutes from "./routes/contact.routes";

export const prisma = new PrismaClient()

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());

app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));