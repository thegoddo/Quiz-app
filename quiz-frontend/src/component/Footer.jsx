// src/components/Footer.jsx
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer
      className="footer bg-dark text-white py-3"
      style={{
        width: "100%",
        color: "white",
        marginTop: "auto",
        textAlign: "center",
        padding: "15px 0",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.2)", // Optional subtle shadow
      }}
    >
      <div className="container">
        <p className="text-ceter">
          &copy; {currentYear} Quiz App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
