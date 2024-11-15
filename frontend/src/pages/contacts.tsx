import { Button, SelectChangeEvent, Stack, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { Contact } from "../types";
import { ContactTable } from "../components/ContactTable";
import { Loader } from "../components/Loader";
import { SortBy } from "../components/SortBy";

export default function ContactsPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [contactList, setContactList] = useState<Contact[] | null | undefined>(null);

  useEffect(() => {
    const getContactList = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/contacts?sortby=${sort}`)
        if (response.data.success) setContactList(response.data.contacts);
      } catch (error: any) {
        toast.error(error.response.data.message || "Error while fetching contact information");
      } finally {
        setLoading(false);
      }
    }
    getContactList();
  }, [sort]);

  const handleDeleteContact = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/${id}`);
      if (response.data.success) {
        const newContactList = contactList?.filter(contact => contact.id !== id);
        setContactList(newContactList);
        toast.success(response.data.message || "Contact deleted successfully");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message || "Error while fetching contact information");
    }
  }

  const handleSotr = (e: SelectChangeEvent) => {
    setSort(e.target.value);
    navigate(`?sortby=${e.target.value}`)
  };

  if (loading) return <Loader />
  
  return (
  <Stack spacing={2}>
    <Stack alignItems="center">
      <Typography variant="h4" sx={{ mt: 4 }}>
        All Contact Informations are here
      </Typography>
    </Stack>
    {contactList?.length ? (
      <>
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <SortBy sort={sort} handleSort={handleSotr} />
          <Button variant="contained" onClick={() => navigate("/add-contact")}>
            Add New Contact
          </Button>
        </Stack>
        <ContactTable contactList={contactList} handleDeleteContact={handleDeleteContact} />
      </>
    ) : (
      <Stack alignItems="center" spacing={2}>
        <Typography variant='h5' color='warning'>
          No contact information available!
        </Typography>
        <Button variant="contained" onClick={() => navigate("/add-contact")}>
          Add New Contact
        </Button>
      </Stack>
    )}
  </Stack>
  )
}