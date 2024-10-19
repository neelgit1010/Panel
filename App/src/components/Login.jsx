import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ showPassword, setShowPassword }) => {
  
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {email, password } = loginInfo;
    
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if(response.data.success) {
        // console.log(response.data);
        const {email, name, token} = response.data;
        // console.log(email, name, token);
        
        toast.success(`🦄 ${response.data.message}!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

          setTimeout(() => {
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            localStorage.setItem("token", token);
            navigate("/dashboard");
          }, 1000);
      }
        
    } catch (error) {
      toast.error(`🦄 ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <div className="landing-page">
      <div className="card">
        <form action="/dashboard" onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <FaUserAlt className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span
              className="icon-eye"
              onClick={() => setShowPassword((curr) => !curr)}
            >
              {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;