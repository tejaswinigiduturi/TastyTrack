import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Folder/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.phone || !formData.password) {
        setError("Please fill in all required fields");
        return;
      }

      // Validate phone number format
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }

      // Validate password strength
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      // Get existing users or create empty array
      const existingUsers = JSON.parse(localStorage.getItem("tastyTrackUsers") || "[]");
      
      // Check if user already exists
      if (existingUsers.some(user => user.phone === formData.phone)) {
        setError("A user with this phone number already exists");
        return;
      }

      // Create new user object with ID and timestamp
      const newUser = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      // Add new user to array
      existingUsers.push(newUser);
      
      // Save updated users array
      localStorage.setItem("tastyTrackUsers", JSON.stringify(existingUsers));
      
      // Log the user in
      await login(newUser);

      setError("");
      setSuccess("Account created successfully ✅");

      // Redirect to login immediately since user is logged in
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${require("../Images/Background.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="signup-card p-4 shadow-lg"
        style={{
          width: "380px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h3 className="text-center mb-3">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

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
            <label className="form-label">Email</label>
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
          {success && <p className="text-success text-center">{success}</p>}

          <button type="submit" className="btn btn-success w-100 mt-2">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
