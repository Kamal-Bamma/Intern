import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Routed from "./components/RoutePath";
import Sidebar from "./components/Sidebar";
import Login from "./components/PageLogin";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routed />
    </>
  );
}

export default App;
