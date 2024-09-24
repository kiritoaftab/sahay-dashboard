import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/AdminLayout/Layout";
import PersistLogin from "./components/Auth/PersistLogin";
import { AdminLayout } from "./components";
import {
  AdminAddRanger,
  AdminCustomer,
  AdminHome,
  AdminPayments,
  AdminRanger,
  AdminService,
} from "./pages";
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
import AssignRanger from "./pages/Vendor/AssignRanger";
import BookingDetails from "./pages/Vendor/BookingDetails";
import VendorRangerDetails from "./pages/Vendor/VendorRangerDetails";
import VROLayout from "./components/VROLayout";
import VROHome from "./pages/VRO/VROHome";
import AddServices from "./pages/Services/AddServices";
import AdminVRO from "./pages/Admin/AllVro";
import AddVRO from "./pages/Admin/AddVro";
import AllServices from "./pages/Services/AllServices";
import EditService from "./pages/Services/EditService";
import ResetPassword from "./pages/ResetPassword";
import RequireAuth from "./components/Auth/RequireAuth";
import AdminProfile from "./pages/Admin/AdminProfile";
import PrivacyPolicy from "./pages/Admin/PrivacyPolicy";
import Terms from "./pages/Admin/Terms";
import VendorProfile from "./pages/Vendor/VendorProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        {/* admin , vro routes */}
        <Route element={<RequireAuth allowedRole={["ADMIN"]} />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<AdminHome />} />
            <Route path="vendors" element={<AdminVendor />} />
            <Route path="addVendor" element={<AddVendor />} />
            <Route path="editVendor/:id" element={<EditVendor />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />

            <Route path="rangers" element={<AdminRanger />} />
            <Route path="addRanger" element={<AdminAddRanger />} />
            <Route path="rangers/:id" element={<AdminRangerDetails />} />

            <Route path="addServices" element={<AddServices />} />
            <Route path="allServices" element={<AllServices />} />
            <Route path="updateServices/:id" element={<EditService />} />

            <Route path="allVro" element={<AdminVRO />} />
            <Route path="addVro" element={<AddVRO />} />

            <Route path="customers" element={<AdminCustomer />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="bookings" element={<AdminService />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* vendor routes */}
        <Route element={<RequireAuth allowedRole={["VENDOR"]} />}>
          <Route path="vendor" element={<VendorLayout />}>
            <Route path="" element={<VendorHome />} />
            <Route path="bookings" element={<VendorBookings />} />
            <Route path="bookingDetails/:id" element={<BookingDetails />} />
            <Route path="rangers" element={<VendorRangers />} />
            <Route
              path="bookings/assignRanger/:id"
              element={<AssignRanger />}
            />
            <Route path="addRanger" element={<VendorAddRanger />} />
            <Route path="editRanger/:id" element={<VendorRangerDetails />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="vendorprofile" element={<VendorProfile />} />
          </Route>
        </Route>

        {/* vro routes */}
        <Route element={<RequireAuth allowedRole={["VRO"]} />}>
          <Route path="vro" element={<VROLayout />}>
            <Route path="" element={<VROHome />} />

            <Route path="vendors" element={<AdminVendor />} />
            <Route path="addVendor" element={<AddVendor />} />
            <Route path="editVendor/:id" element={<EditVendor />} />

            <Route path="rangers" element={<AdminRanger />} />
            <Route path="addRanger" element={<AdminAddRanger />} />
            <Route path="rangers/:id" element={<AdminRangerDetails />} />

            <Route path="customers" element={<AdminCustomer />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="bookings" element={<AdminService />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Route>
        </Route>
      </Route>
      {/* invalid route */}
      <Route path="*" element={<p>Invalid page</p>} />
    </Routes>
  );
}

export default App;
