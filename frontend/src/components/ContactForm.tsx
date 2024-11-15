import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Stack } from '@mui/material';
import { contactFormSchema,  Contact, ContactFormType } from '../types';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ContactFormProps {
  contact?: Contact;
}

export function ContactForm({ contact }: ContactFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormType>({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    email: contact?.email || '',
    phoneNumber: contact?.phoneNumber || '',
    company: contact?.company || '',
    jobTitle: contact?.jobTitle || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message || "Invalid input");
      return;
    }
    try {
      const method = contact?.id ? 'put' : 'post';
      const response = await axios[method](`${import.meta.env.VITE_API_URL}/contacts${contact?.id ? `/${contact.id}` : ''}`, result.data);
      if (response.data.success) {
        toast.success(response.data.message || "Contact saved successfully");
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb:3, textAlign: 'center'}}>
        Enter Contact Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Stack>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}