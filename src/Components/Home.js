import React, { useEffect, useState } from "react";
import cookingGif from "../Images/download-3--unscreen.gif";
function Home() {
  const [text, setText] = useState("");
  const fullText = "TastyTrack";

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
    <div className="home-container d-flex flex-column justify-content-center align-items-center text-center">
      <div className="content">
        {/* Animated Title */}
        <h1 className="display-6 fw-bold text-light mb-3">
          <span className="highlight" style={{ color: "tomato" }}>
            {text}
            <span className="blinking-cursor"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="lead text-light mb-6">
          Discover Delicious Recipes and Find Your Next Favorite Meal! <br />
          Start Cooking Today!
        </p>
        {/* GIF Section */}
        <img
          src={cookingGif}
          alt="Cooking Animation"
          className="img-fluid mt-4 rounded-4 shadow"
          style={{
            maxWidth: "300px",
            transition: "opacity 1s ease-in-out",
            opacity: 1,
          }}
        />
      </div>
    </div>
    
  );
}

export default Home