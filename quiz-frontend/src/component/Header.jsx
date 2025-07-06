// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref for the dropdown menu

  // Effect to get current user on component mount and when localStorage changes
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, []);

  // Effect to handle clicks outside the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setShowProfileMenu(false);
    navigate("/login");
    window.location.reload(); // Optional: force a full reload to update entire app state
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{
        // Basic inline styles - replace with your actual CSS framework (e.g., Bootstrap classes)
        width: "100%",
        position: "fixed", // Fixed at the top
        top: 0,
        left: 0,
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      <div className="container-fluid">
        {/* Brand Name */}
        <Link to="/" className="navbar-brand">
          Quiz App
        </Link>

        {/* Navbar Toggler for small screens (if using Bootstrap) */}
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {" "}
            {/* ms-auto pushes items to the right */}
            {currentUser ? (
              <li className="nav-item dropdown" ref={menuRef}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#" // Use '#' or no href, avoid actual link
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown" // For Bootstrap dropdown JS
                  aria-expanded={showProfileMenu ? "true" : "false"}
                  onClick={toggleProfileMenu}
                  style={{ cursor: "pointer" }}
                >
                  Hi, {currentUser.username}!
                </a>
                {showProfileMenu && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show" // 'show' and 'dropdown-menu-end' for right alignment
                    aria-labelledby="navbarDropdown"
                    style={{
                      position: "absolute", // Ensures positioning is relative to parent
                      backgroundColor: "#343a40", // Dark background for dropdown
                      border: "1px solid #495057",
                      borderRadius: "5px",
                      minWidth: "120px",
                      padding: "5px 0",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    <li>
                      <button
                        className="dropdown-item text-white bg-transparent border-0 w-100 text-start"
                        onClick={handleLogout}
                        style={{
                          padding: "8px 15px",
                          "&:hover": { backgroundColor: "#495057" },
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
