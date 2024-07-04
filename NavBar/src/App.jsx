import "./App.css";
import Contact from "./components/Contact";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Blog from "./components/Blog";
import Email from "./components/Email";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </>
  );
}

export default App;
