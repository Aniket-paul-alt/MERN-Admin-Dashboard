import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Login } from "./pages/Login"
import { Services } from "./pages/Services"
import { Register } from "./pages/Register"
import { Navbar } from "./components/Navbar"
import { Error } from "./pages/Error"
import { Footer } from "./components/Footer/Footer"
import { Logout } from "./pages/Logout"
import { AdminLayout } from "./components/Layouts/Admin-Layout"
import { AdminUsers } from "./pages/Admin-User"
import { AdminContact } from "./pages/Admin-Contact"
import { AdminUpdate } from "./pages/Admin-Update"

export const App = () =>{
  return <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers/>} />
          <Route path="contacts" element={<AdminContact/>} />
          <Route path="users/:id/edit" element={<AdminUpdate/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  </>
}