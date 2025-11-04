import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import cookingGif from "../Images/gif.gif";
import { Link } from "react-router-dom";

function About() {
  const steps = [
    {
      number: "1",
      title: "Create Account",
      description:
        "Sign up for free to access all features. Just enter your name, phone number, and password.",
    },
    {
      number: "2",
      title: "Explore Recipes",
      description:
        "Browse recipes by category or use the search to find specific dishes. Each recipe includes detailed instructions and ingredients.",
    },
    {
      number: "3",
      title: "Save & Organize",
      description:
        "Like a recipe? Save it to favorites. Access your saved recipes anytime from your personal dashboard.",
    },
    {
      number: "4",
      title: "Cook & Enjoy",
      description:
        "Follow the step-by-step instructions to create delicious meals. Download recipes as PDFs for offline access.",
    },
  ];

  return (
    <div className="about-container d-flex flex-column justify-content-center align-items-center text-center">
      <div className="about-content">
        <h2 className="about-title fw-bold mb-4">About TastyTrack</h2>

        <p className="about-text">
          <strong>TastyTrack</strong> is your ultimate recipe companion, helping
          you explore delicious meals and organize your kitchen adventures.
          Whether you’re a chef or a home cook, we make discovering new dishes
          easy, fun, and inspiring. Dive into global cuisines, find your
          favorites, and bring restaurant-quality taste right to your home.
        </p>

        <img
          src={cookingGif}
          alt="Cooking GIF"
          className="about-gif mb-4"
          style={{
            maxWidth: "200px",
            transition: "opacity 1s ease-in-out",
            opacity: 1,
            alignItems: "right",
          }}
        />

        <Link to="/signup" className="btn btn-primary mb-5">
          Get Started
        </Link>

        {/* How to Use Steps */}
        <div className="steps-section mt-5">
          <h3 className="text-center text-light fw-bold mb-5">
            Get Started in 4 Easy Steps
          </h3>
          <div className="row g-4">
            {steps.map((step, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="step-card text-center">
                  <div className="step-number mb-3">
                    <span className="badge bg-primary rounded-circle p-3">
                      {step.number}
                    </span>
                  </div>
                  <h5 className="fw-bold text-light mb-3">{step.title}</h5>
                  <p className="text-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
