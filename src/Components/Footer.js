import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    
    <footer className="footer bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-warning">🍴 TastyTrack</h4>
            <p className="text-light small">
              Discover delicious recipes, explore global cuisines, and keep
              track of your favorite meals — all in one place!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-warning fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-light footer-link">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-light footer-link">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none text-light footer-link">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/signup" className="text-decoration-none text-light footer-link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="text-warning fw-bold mb-3">Follow Us</h5>
            <p className="small text-light">Find recipe inspiration on our social channels</p>
            <div className="d-flex justify-content-center gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-4 footer-icon"
                aria-label="TastyTrack on Facebook"
              >
                <FaFacebook />
              </a>

              {/* Instagram: link to recipes hashtag */}
              <a
                href="https://www.instagram.com/explore/tags/recipes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-4 footer-icon"
                aria-label="TastyTrack recipes on Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-4 footer-icon"
                aria-label="TastyTrack on Twitter"
              >
                <FaTwitter />
              </a>

              {/* YouTube: search results for recipes */}
              <a
                href="https://www.youtube.com/results?search_query=recipes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-4 footer-icon"
                aria-label="TastyTrack recipes on YouTube"
              >
                <FaYoutube />
              </a>
            </div>
            <div className="mt-3 small">
              <a
                href="https://www.instagram.com/explore/tags/recipes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-warning me-3"
              >
                Instagram Recipes
              </a>
              <a
                href="https://www.youtube.com/results?search_query=recipes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-warning"
              >
                YouTube Recipes
              </a>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center small text-light">
          © {new Date().getFullYear()} <span className="text-warning fw-bold">TastyTrack</span> | All Rights Reserved 🍽️
        </div>
      </div>
    </footer>
  );
}

export default Footer;
