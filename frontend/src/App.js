import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/AdminLayout/Layout";
import PersistLogin from "./components/Auth/PersistLogin";
import { AdminLayout } from "./components";


function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout/>}>
      {/* public routes */}
      <Route exact path="/" element={<h1>Login page</h1>} />

      <Route element={<PersistLogin/>}>
        <Route path="admin" element={<AdminLayout/>} >
          <Route path="" element={<h1>Home page</h1>} />
          <Route path="rangers" element={<h1>Rangers</h1>} />
          <Route path="customers" element={<h1>Customers</h1>} />
          <Route path="addRanger" element={<h1>Add Ranger</h1>} />
          <Route path="payments" element={<h1>Payments</h1>} />
          <Route path="services" element={<h1>Services Page</h1>} />
        </Route>

      </Route>

      

      {/* invalid route */}
      <Route path="*" element={<p>Invalid page</p>} />
    </Route>

  </Routes>
  );
}

export default App;
