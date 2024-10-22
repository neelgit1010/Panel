import axios from "axios";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Handle forgot password logic here
    // console.log("Email:", email);
    try{ 
      const res = await axios.post('https://panel-api-server.vercel.app/reset-password', { email });
      if(res) {
        console.log(res.data);
        toast.success(`🦄 Password reset link sent to your email`);
      }
    }
    catch(error) { toast.error(`🦄 ${error.message}! Try again later`);}
  };

  return (
    <div className="landing-page">
      <div className="card">
        <form onSubmit={handleFormSubmit}>
          <div className="text-center fs-3">
            <FaLock />
          </div>
          <h1>Reset Password</h1>
          <div className="input-box">
            <MdEmail className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Password Reset Link
          </button>

          <p className="register-link">
            <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
