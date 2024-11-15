import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../types";
import axios from "axios";
import { toast } from "sonner";
import { ContactForm } from "../components/ContactForm";
import { Loader } from "../components/Loader";

export default function UpdateContact() {
     const [contact, setContact] = useState<Contact | null>(null);
     const [loading, setLoading] = useState(false);
     const params = useParams();
     
     useEffect(() => {
          setLoading(true);
          const getContact = async () => {
               try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/contacts/${params.id}`);
                    setContact(response.data.contact);
               } catch (error: any) {
                    console.error(error);
                    toast.error(error.response.data.message || "Error while fetching contact information");
               } finally {
                    setLoading(false);
               }
          }
          getContact()
     }, []);

     if (loading) return <Loader />

  return (
     <>
          {contact && <ContactForm contact={contact} /> }
     </>
  )
}
