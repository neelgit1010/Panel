import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = ({ showPassword, setShowPassword }) => {

  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = loginInfo;
    
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      toast.success('🦄 User registered successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div className="landing-page">
      <div className="card">
        <form method="post" action="" onSubmit={(e) => handleFormSubmit(e)}>
          <h1>Rgister</h1>
          <div className="input-box">
            <FaUserAlt className="icon" />
            <input type="text" name="name" placeholder="Name" required onChange={handleChange}/>
          </div>
          <div className="input-box">
            <MdEmail className="icon" />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
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

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
