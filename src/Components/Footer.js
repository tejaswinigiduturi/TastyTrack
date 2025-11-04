import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }

    const subs = JSON.parse(localStorage.getItem("tastyTrackSubscribers") || "[]");
    if (!subs.includes(email)) {
      subs.push(email);
      localStorage.setItem("tastyTrackSubscribers", JSON.stringify(subs));
      setMsg("Thanks for subscribing!");
    } else {
      setMsg("You're already subscribed.");
    }
    setEmail("");
    setTimeout(() => setMsg(""), 3500);
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row gy-4">
          {/* 🌿 Featured Recipes */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-warning">Featured Recipes</h5>
            <ul className="list-unstyled mt-3 small">
              <li className="mb-2">
                <Link to="/recipes/italian" className="footer-link text-light text-decoration-none">
                  🍝 Italian Classics
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/recipes/healthy" className="footer-link text-light text-decoration-none">
                  🥗 Healthy Meals
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/recipes/desserts" className="footer-link text-light text-decoration-none">
                  🍰 Sweet Desserts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/recipes/trending" className="footer-link text-light text-decoration-none">
                  🔥 Trending Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* 🧭 Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-warning">Quick Links</h5>
            <ul className="list-unstyled mt-3 small">
              <li className="mb-2">
                <Link to="/about" className="footer-link text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link text-light text-decoration-none">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="footer-link text-light text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="footer-link text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 📩 Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-warning">Stay Updated</h5>
            <p className="small mt-3">
              Join our newsletter for weekly recipe inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="d-flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="form-control me-2"
                required
              />
              <button type="submit" className="btn btn-success">
                Subscribe
              </button>
            </form>
            {msg && <div className="small mt-2 text-warning">{msg}</div>}
          </div>

          {/* 📱 App & Social Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-warning">Get the App</h5>
            <div className="d-flex flex-column gap-2 mt-3">
              {/* ✅ Tasty App */}
              <a
                href="https://play.google.com/store/apps/details?id=com.buzzfeed.tasty"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm"
              >
                🍳 Get Tasty on Google Play
              </a>
              

              {/* ✅ Yummly App */}
              <a
                href="https://play.google.com/store/apps/details?id=com.yummly.android"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm"
              >
                🧁 Get Yummly on Google Play
              </a>
             
             
             
            </div>

            {/* 🌐 Social Links */}
            <div className="d-flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/explore/tags/recipes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/results?search_query=recipes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaYoutube />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary mt-5" />
        <div className="text-center small text-muted">
          © {new Date().getFullYear()}{" "}
          <span className="text-warning fw-bold">TastyTrack</span> — Delicious recipes, anytime.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
