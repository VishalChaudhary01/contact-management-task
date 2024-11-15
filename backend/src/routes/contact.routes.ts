import express from "express";
import { addContact, deleteContact, fetchAllContacts, fetchContactById, updateContact } from "../controllers/contact.controllers";

const router = express.Router();

router.get("/", fetchAllContacts);
router.get("/:id", fetchContactById);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;