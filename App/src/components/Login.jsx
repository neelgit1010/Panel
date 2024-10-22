import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Login = ({ showPassword, setShowPassword }) => {
  
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  // Retrieve email from localStorage if 'Remember Me' was checked
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setLoginInfo((prevInfo) => ({
        ...prevInfo,
        email: rememberedEmail,
      }));
      setRememberMe(true); // Automatically check the checkbox
    }
  }, []);

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberedEmail");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        const { email, name, token } = response.data;
        
        // Show success toast
        toast.success(`🦄 Welcome, ${name}!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Save email to localStorage if 'Remember Me' is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Save token and user data, then navigate to dashboard
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
        <form onSubmit={handleFormSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <MdEmail className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={loginInfo.email}
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
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              Remember me
            </label>
           <Link to="/forgot-password">Forgot password?</Link>
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
