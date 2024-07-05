import React, { useEffect, useState } from "react";

const PageLogin_P = () => {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  });

  const addItem = (email, password) => {
    const newItem = {
      id: nextId,
      email,
      password,
    };
    localStorage.setItem("items", JSON.stringify([...items, newItem]));
    setItems([...items, newItem]);
    setNextId(nextId + 1);
  };

  return <div></div>;
};

export default PageLogin_P;
