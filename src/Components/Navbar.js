import React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../Images/Logo.png"; // ✅ adjust path if needed

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-2">
      <div className="container-fluid px-4">
        {/* Left: Logo + Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="TastyTrack Logo"
            style={{
              height: "100px",
              width: "auto",
              marginRight: "10px",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center: Nav Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item mx-3">
              <NavLink className="nav-link fs-5" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link fs-5" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link fs-5" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right: Login + Sign Up */}
        <div className="d-none d-lg-flex align-items-center">
          {/* Login Button */}
          <Link
            to="/login"
            className="nav-link fs-5 text-white mx-3"
            style={{
              backgroundColor: "transparent",
              border: "none",
              transition: "0.3s",
              borderRadius: "6px",
              padding: "6px 12px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "tomato")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Login
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/signup"
            className="nav-link fs-5 text-white mx-3"
            style={{
              backgroundColor: "transparent",
              border: "none",
              transition: "0.3s",
              borderRadius: "6px",
              padding: "6px 12px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "tomato")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
