import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Hello {location.state.id}, This is a Home page</h1>
    </div>
  );
};

export default Home;
