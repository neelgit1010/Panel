import { FaUserAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import data from "./MOCK_DATA.json";

const Login = ({ showPassword, setShowPassword }) => {
  
  const navigate = useNavigate();
  const openDashboard = (e) => {
    e.preventDefault();
    const userData = data.find(
      (user) =>
        user.first_name === e.target.username.value &&
        user.pwd === e.target.password.value
    );
    if (userData === undefined) {
      alert("Invalid username or password");
      return;
    }
    alert("Login Successful");
    navigate("/dashboard", { state: { userData } });
  };

  return (
    <div className="landing-page">
      <div className="card">
        <form action="/dashboard" onSubmit={(e) => openDashboard(e)}>
          <h1>Login</h1>
          <div className="input-box">
            <FaUserAlt className="icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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