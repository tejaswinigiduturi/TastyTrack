import React, { useEffect, useState } from "react";
import cookingGif from "../Images/download-3--unscreen.gif";
 import { Link } from "react-router-dom";

function Home() {
  const [text, setText] = useState("");
  const fullText = "TastyTrack";
  
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Home Chef",
      comment: "TastyTrack transformed my cooking journey! The recipes are easy to follow and delicious.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Food Enthusiast",
      comment: "The variety of recipes and the community support make this platform outstanding.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Professional Chef",
      comment: "As a professional chef, I love sharing my recipes here. The community is amazing!",
      rating: 4.5
    }
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center">
        <div className="hero-content">
          <h1 className="display-4 fw-bold text-light mb-3">
            <span className="highlight" style={{ color: "tomato" }}>
              {text}
              <span className="blinking-cursor"></span>
            </span>
          </h1>
          <p className="lead text-light mb-4">
            Discover Delicious Recipes and Find Your Next Favorite Meal!
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg">
              Learn More
            </Link>
          </div>
        </div>
        <img
          src={cookingGif}
          alt="Cooking Animation"
          className="hero-image img-fluid mt-4 rounded-4 shadow"
        />
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose TastyTrack?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card text-center p-4">
                <i className="fas fa-search mb-3"></i>
                <h3>Discover Recipes</h3>
                <p>Find recipes that match your taste and dietary preferences</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center p-4">
                <i className="fas fa-bookmark mb-3"></i>
                <h3>Save Favorites</h3>
                <p>Create your personal collection of favorite recipes</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center p-4">
                <i className="fas fa-users mb-3"></i>
                <h3>Join Community</h3>
                <p>Connect with other food lovers and share your experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="vision-card text-center p-4">
                <i className="fas fa-eye mb-3 vision-icon"></i>
                <h3>Our Vision</h3>
                <p>To make cooking accessible and enjoyable for everyone, bringing people together through the joy of food.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="vision-card text-center p-4">
                <i className="fas fa-bullseye mb-3 vision-icon"></i>
                <h3>Our Mission</h3>
                <p>Providing a platform where food enthusiasts can discover, share, and perfect their culinary skills.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="vision-card text-center p-4">
                <i className="fas fa-heart mb-3 vision-icon"></i>
                <h3>Our Values</h3>
                <p>Quality, creativity, community, and passion for bringing the best cooking experience to our users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="about-section py-5" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">Why Choose Us?</h2>
              <div className="stats row text-center mb-4">
                <div className="col-4">
                  <h3>1000+</h3>
                  <p>Recipes</p>
                </div>
                <div className="col-4">
                  <h3>50K+</h3>
                  <p>Users</p>
                </div>
                <div className="col-4">
                  <h3>4.8⭐</h3>
                  <p>Rating</p>
                </div>
              </div>
              <p className="mb-4">
                Join our vibrant community of food enthusiasts and discover a world of culinary delights.
                From quick weekday meals to gourmet weekend feasts, we've got you covered.
              </p>
              <Link to="/about" className="btn btn-outline-primary btn-lg">
                Learn More About Us
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src={cookingGif} 
                alt="Cooking Preview" 
                className="img-fluid rounded-4 shadow"
                style={{ maxWidth: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <div className="row">
            {reviews.map((review, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="review-card p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="review-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">{review.name}</h5>
                      <small className="text-muted">{review.role}</small>
                    </div>
                  </div>
                  <p className="mb-2">{review.comment}</p>
                  <div className="rating">
                    {"★".repeat(Math.floor(review.rating))}
                    {review.rating % 1 === 0.5 ? "½" : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section py-5" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="mb-4">Get in Touch</h2>
              <p className="mb-4">
                Have questions or suggestions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
              <div className="contact-info">
                <div className="mb-3">
                  <h5>📍 Address</h5>
                  <p>123 Foodie Street, Culinary City, FC 12345</p>
                </div>
                <div className="mb-3">
                  <h5>📧 Email</h5>
                  <p>contact@tastytrack.com</p>
                </div>
                <div className="mb-3">
                  <h5>📞 Phone</h5>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form p-4 rounded-4">
                <h3 className="mb-4">Send Message</h3>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section text-center py-5">
        <div className="container">
          <h2 className="mb-4">Ready to Start Your Culinary Journey?</h2>
          <p className="mb-4">Join thousands of food enthusiasts and start exploring new recipes today!</p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;