import { BrowserRouter, Route, Routes } from "react-router-dom"
import ContactsPage from "./pages/contacts"
import AddNewContactPage from "./pages/addContact"
import UpdateContact from "./pages/updateContact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <ContactsPage /> } />
        <Route path="/add-contact" element={ <AddNewContactPage /> } />
        <Route path="/update/:id" element={ <UpdateContact /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
