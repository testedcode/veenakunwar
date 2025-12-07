import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-content">

        {/* LOGO + TEXT */}
        <div className="navbar-brand">
          <img
            src="/assets/logo-hasya-yoga.png"
            alt="Hasya Yoga by Veena"
            className="brand-logo"
          />
          <span className="brand-text">Hasya Yoga by Veena</span>
        </div>

        {/* NAVIGATION MENU */}
        <ul className="navbar-menu">
          <li>
            <Link className={location.pathname === "/" ? "active" : ""} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === "/about" ? "active" : ""}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === "/gallery" ? "active" : ""}
              to="/gallery"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === "/contact" ? "active" : ""}
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
