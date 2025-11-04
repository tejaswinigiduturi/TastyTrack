import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Folder/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem("tastyTrackUsers") || "[]");

      // Find user with matching phone and password
      const user = users.find(
        u => u.phone.trim() === formData.phone.trim() && 
        u.password.trim() === formData.password.trim()
      );

      if (!user) {
        setError("Invalid phone number or password ❌");
        return;
      }

      // Login successful
      setError("");
      await login(user);

      // Redirect to the page they tried to visit or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="login-text d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${require("../Images/Background.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className=" login-card p-4 shadow-lg"
        style={{
          width: "350px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email (optional)</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
