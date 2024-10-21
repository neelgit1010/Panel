import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHandler from "./UserHandler";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";
import Yearly from "./pages/Yearly";
import Monthly from "./pages/Monthly";
import Weekly from "./pages/Weekly";
import BillingInfo from "./pages/BillingInfo";
import CompanyValues from "./pages/CompanyValues";
import FeaturedProjects from "./pages/FeaturedProjects";
import OrderHistory from "./pages/OrderHistory";
import OurServices from "./pages/OurServices";
import ProjectOverview from "./pages/ProjectOverview";
import RecentActivity from "./pages/RecentActivity";
import Reports from "./pages/Reports";
import ShippingAdd from "./pages/ShippingAdd";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? (
      children
    ) : (
      <Login showPassword={showPassword} setShowPassword={setShowPassword}>
        {" "}
      </Login>
    );
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <UserHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={
            <Login
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            >
              {" "}
            </Login>
          }
        />
        <Route
          path="/register"
          element={
            <Register
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />

        <Route path="/dashboard" element={<PrivateRoute children={<Dashboard />} />}>
          <Route path="add-product" element={<PrivateRoute children={<AddProduct />} />} />
          <Route path="view-product" element={<PrivateRoute children={<ViewProducts />} />} />
          <Route path="weekly" element={<PrivateRoute children={<Weekly />} />} />
          <Route path="monthly" element={<PrivateRoute children={<Monthly />} />} />
          <Route path="yearly" element={<PrivateRoute children={<Yearly />} />} />
          <Route path="billing-info" element={<PrivateRoute children={<BillingInfo />} />} />
          <Route path="company-values" element={<PrivateRoute children={<CompanyValues />} />} />
          <Route path="featured-projects" element={<PrivateRoute children={<FeaturedProjects />} />} />
          <Route path="order-history" element={<PrivateRoute children={<OrderHistory />} />} />
          <Route path="services" element={<PrivateRoute children={<OurServices />} />} />
          <Route path="project-overview" element={<PrivateRoute children={<ProjectOverview />} />} />
          <Route path="recent-activity" element={<PrivateRoute children={<RecentActivity />} />} />
          <Route path="reports" element={<PrivateRoute children={<Reports />} />} />
          <Route path="shipping" element={<PrivateRoute children={<ShippingAdd />} />} />
        </Route>
        
        <Route path="*" element={ <center><h1>Page Not Found</h1></center> } />
        
      </Routes>
    </Router>
  );
}

export default App;
