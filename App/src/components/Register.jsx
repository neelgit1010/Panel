import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const Register = ({ showPassword, setShowPassword }) => {

  const refEmail = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = refEmail.current.value;
    const username = refUsername.current.value;
    const password = refPassword.current.value;
  
    const userData = {
      email,
      username,
      password,
    };
  
    console.log(userData); // Log the data being sent
    try {
      const response = await axios.post("http://localhost:5000/register", userData);
      console.log("User registered successfully:", response.data);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  

  return (
    <div className="landing-page">
      <div className="card">
        <form method="post" action="" onSubmit={(e) => handleFormSubmit(e)}>
          <h1>Rgister</h1>
          <div className="input-box">
            <MdEmail className="icon" />
            <input type="email" placeholder="Email" ref={refEmail} required />
          </div>
          <div className="input-box">
            <FaUserAlt className="icon" />
            <input type="text" placeholder="Username" ref={refUsername} required />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={refPassword}
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
