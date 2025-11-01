import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">
        © {new Date().getFullYear()} TastyTrack | All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
