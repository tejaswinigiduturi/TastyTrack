import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// Small helper to validate email
const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }

    // Save subscriber locally (simple demo)
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
    <footer className="footer bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          {/* Column: Product */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold">Product</h5>
            <ul className="list-unstyled small mt-3">
              <li className="mb-2">Explore Recipes</li>
              <li className="mb-2">Favorites</li>
              <li className="mb-2">Collections</li>
            </ul>
          </div>

          {/* Column: Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold">Support</h5>
            <ul className="list-unstyled small mt-3">
              <li className="mb-2">
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </li>
              <li className="mb-2">FAQ</li>
              <li className="mb-2">Refund &amp; Returns</li>
              <li className="mb-2">Privacy Policy</li>
            </ul>
          </div>

          {/* Column: About */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold">About</h5>
            <ul className="list-unstyled small mt-3">
              <li className="mb-2">
                <Link to="/about" className="footer-link">Our Story</Link>
              </li>
              <li className="mb-2">How It Works</li>
              <li className="mb-2">Reviews</li>
              <li className="mb-2">Blog</li>
            </ul>
          </div>

          {/* Column: Resources & Subscribe */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold">Resources</h5>
            <ul className="list-unstyled small mt-3">
              <li className="mb-2">Affiliates</li>
              <li className="mb-2">Brand Ambassadors</li>
              <li className="mb-2">Refer a Friend</li>
            </ul>

            <div className="mt-3">
              <label className="form-label small d-block mb-2">Sign up to our mailing list</label>
              <form onSubmit={handleSubscribe} className="d-flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form-control me-2"
                  aria-label="Email address"
                  required
                />
                <button className="btn btn-success" type="submit">Subscribe</button>
              </form>
              {msg && <div className="small mt-2 text-warning">{msg}</div>}
            </div>
          </div>
        </div>

        <div className="row align-items-center mt-4">
          <div className="col-md-6">
            <div className="small">
              <strong>TastyTrack LLC</strong>
              <div>1007 North Orange St, Wilmington DE 19801</div>
              <div>support@tastytrack.com</div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm">Get it on Google Play</a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm">Download on the App Store</a>
            </div>
          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end gap-3 align-items-center">
              <a href="https://www.instagram.com/explore/tags/recipes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-icon text-light"><FaInstagram /></a>
              <a href="https://www.youtube.com/results?search_query=recipes" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-icon text-light"><FaYoutube /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer-icon text-light"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary mt-4" />
        <div className="bottom-row small text-center text-md-start text-muted">
          <div>© {new Date().getFullYear()} <span className="text-warning fw-bold">TastyTrack</span></div>
          <div>All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
