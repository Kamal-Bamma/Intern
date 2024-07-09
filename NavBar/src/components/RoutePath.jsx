import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import Email from "./Email";
import Login from "./PageLogin";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import SignUpPage from "./SignUpPage";

function Routed({ setFEmail }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setFEmail={setFEmail} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </>
  );
}

export default Routed;
