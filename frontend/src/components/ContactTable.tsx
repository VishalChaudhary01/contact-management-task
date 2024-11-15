import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Contact } from "../types";
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'company' | 'jobTitle';
  label: string;
}

const columns: readonly Column[] = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'company',label: 'Company' },
  { id: 'jobTitle', label: 'Job Title' },
];

export function ContactTable({ contactList, handleDeleteContact }: { contactList: Contact[]; handleDeleteContact: (id: string) => void; }) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
                  key={column.id}
                  align='center'
                  style={{ minWidth: 100 }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='center' style={{ minWidth: 80 }} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={contact.id}>
                    {columns.map((column) => {
                      const value = contact[column.id];
                      return (
                        <TableCell key={column.id} align='center'>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align='center'>
                      <Button onClick={() => navigate(`/update/${contact.id}`)}>
                        <EditNoteIcon />
                      </Button>
                      <Button onClick={() => handleDeleteContact(contact.id)} >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contactList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}