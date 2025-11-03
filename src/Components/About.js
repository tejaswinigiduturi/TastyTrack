import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cookingGif from "../Images/gif.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBook, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <div className="about-container d-flex flex-column justify-content-center align-items-center text-center">
      <div className="about-content">
        <h2 className="about-title fw-bold mb-4">About TastyTrack</h2>

        <p className="about-text">
          <strong>TastyTrack</strong> is your ultimate recipe companion,
          helping you explore delicious meals and organize your kitchen
          adventures. Whether you’re a chef or a home cook, we make discovering
          new dishes easy, fun, and inspiring. Dive into global cuisines, find
          your favorites, and bring restaurant-quality taste right to your home.
        </p>

        {/* GIF Section */}
        <img
          src={cookingGif}
          alt="Cooking Animation"
          className="img-fluid mt-4 rounded-4 shadow"
          style={{
            maxWidth: "200px",
            transition: "opacity 1s ease-in-out",
            opacity: 1,
            alignItems: "right",
          }}
        />
      </div>
    </div>
  );
}

export default About;
