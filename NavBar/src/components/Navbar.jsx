import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ fEmail, handleLogout }) => {
  return (
    <>
      <div className="navbar">
        <ul className="navList">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            {fEmail && (
              <div>
                <p className="logged">Logged in as: {fEmail}</p>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
