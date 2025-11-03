import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../Images/Logo.png"; // ✅ adjust path if needed
import { AuthContext } from "../Folder/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardRoute = location.pathname === "/dashboard" || location.pathname.startsWith("/dashboard/");

  const handleLogout = () => {
    logout();
    // After logout redirect to dashboard as requested
    navigate("/dashboard");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-2">
      <div className="container-fluid px-4">
        {/* Left: Logo + Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="TastyTrack Logo"
            style={{
              height: "80px",
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
            {isDashboardRoute ? (
              <li className="nav-item mx-3">
                <NavLink className="nav-link fs-5" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <>
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
                {user && (
                  <li className="nav-item mx-3">
                    <NavLink className="nav-link fs-5" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Right: Login + Sign Up or Logout */}
        <div className="d-none d-lg-flex align-items-center">
          {isDashboardRoute || user ? (
            // Show only logout on dashboard or when user is logged in
            <button
              onClick={handleLogout}
              className="btn btn-outline-light fs-5 mx-2"
              style={{
                transition: "0.3s",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "tomato";
                e.target.style.borderColor = "tomato";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "#fff";
              }}
            >
              Logout
            </button>
          ) : (
            // Not logged in - show Login and Sign Up buttons
            <>
              <Link
                to="/login"
                className="btn btn-outline-light fs-5 mx-2"
                style={{
                  transition: "0.3s",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "tomato";
                  e.target.style.borderColor = "tomato";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "#fff";
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline-light fs-5 mx-2"
                style={{
                  transition: "0.3s",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "tomato";
                  e.target.style.borderColor = "tomato";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "#fff";
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
