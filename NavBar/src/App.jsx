import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Routed from "./components/RoutePath";
import Sidebar from "./components/Sidebar";
import Login from "./components/PageLogin";
import axios from "axios";

function App() {
  const [fEmail, setFEmail] = useState(localStorage.getItem("email") || "");
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setFEmail("");
  };

  return (
    <>
      <Navbar fEmail={fEmail} handleLogout={handleLogout} />
      <Sidebar />
      <Routed setFEmail={setFEmail} />
    </>
  );
}

export default App;
