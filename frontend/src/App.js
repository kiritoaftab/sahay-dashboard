import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/AdminLayout/Layout";
import PersistLogin from "./components/Auth/PersistLogin";
import { AdminLayout } from "./components";
import { AdminAddRanger, AdminCustomer, AdminHome, AdminPayments, AdminRanger, AdminService } from "./pages";
import Login from "./pages/Login";
import AdminRangerDetails from "./pages/Admin/AdminRangerDetails";


function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout/>}>
      {/* public routes */}
      <Route exact path="/" element={<Login/>} />

      <Route element={<PersistLogin/>}>
        <Route path="admin" element={<AdminLayout/>} >
          <Route path="" element={<AdminHome/>} />
          <Route path="rangers" element={<AdminRanger/>} />
          <Route path="customers" element={<AdminCustomer/>} />
          <Route path="addRanger" element={<AdminAddRanger/>} />
          <Route path="payments" element={<AdminPayments/>} />
          <Route path="services" element={<AdminService/>} />
          <Route path="rangers/:id" element={<AdminRangerDetails/>}/> 
        </Route>

      </Route>

      

      {/* invalid route */}
      <Route path="*" element={<p>Invalid page</p>} />
    </Route>

  </Routes>
  );
}

export default App;
