import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHandler from "./UserHandler";

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
        <Route
          path="/dashboard"
          element={<PrivateRoute children={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
