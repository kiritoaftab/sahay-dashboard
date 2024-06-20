import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/AdminLayout/Layout";
import PersistLogin from "./components/Auth/PersistLogin";
import { AdminLayout } from "./components";
import { AdminAddRanger, AdminCustomer, AdminHome, AdminPayments, AdminRanger, AdminService } from "./pages";
import Login from "./pages/Login";
import AdminRangerDetails from "./pages/Admin/AdminRangerDetails";
import AdminVendor from "./pages/Admin/AdminVendor";
import AddVendor from "./pages/Admin/AddVendor";
import EditVendor from "./pages/Admin/EditVendor";
import VendorLayout from "./components/VendorLayout";
import VendorHome from "./pages/Vendor/VendorHome";
import VendorRangers from "./pages/Vendor/VendorRangers";
import VendorBookings from "./pages/Vendor/VendorBookings";
import VendorAddRanger from "./pages/Vendor/VendorAddRanger";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout/>}>
      {/* public routes */}
      <Route exact path="/" element={<Login/>} />

      <Route element={<PersistLogin/>}>
        <Route path="admin" element={<AdminLayout/>} >
          <Route path="" element={<AdminHome/>} />
          
          <Route path="vendors" element={<AdminVendor/>}/>
          <Route path="addVendor" element={<AddVendor/>}/>
          <Route path="editVendor/:id" element={<EditVendor/>}/>

          <Route path="rangers" element={<AdminRanger/>} />
          
          <Route path="customers" element={<AdminCustomer/>} />
          <Route path="addRanger" element={<AdminAddRanger/>} />
          <Route path="payments" element={<AdminPayments/>} />
          <Route path="bookings" element={<AdminService/>} />
          <Route path="rangers/:id" element={<AdminRangerDetails/>}/> 
        </Route>

        {/* TODO: DHEERAJ */}
        <Route path="vendor" element={<VendorLayout/>}>
          <Route path="" element={<VendorHome/>}/>
          <Route path="rangers" element={<VendorRangers/>}/>
          <Route path="bookings" element={<VendorBookings/>}/>
          <Route path="addRanger" element={<VendorAddRanger/>}/>
        </Route>

      </Route>

      

      {/* invalid route */}
      <Route path="*" element={<p>Invalid page</p>} />
    </Route>

  </Routes>
  );
}

export default App;
