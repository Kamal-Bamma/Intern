import React, { useState, useEffect } from "react";
import Form from "./Form";
import ItemList from "./ItemList";

const FormWithList = () => {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);

  // *Load items from localStorage on component mount

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
    setNextId(
      storedItems.length ? storedItems[storedItems.length - 1].id + 1 : 1
    );
  }, []);

  // *Save items to localStorage whenever items change

  // useEffect(() => {}, [items]);

  const addItem = (title, body) => {
    const newItem = {
      id: nextId,
      title,
      body,
    };
    localStorage.setItem("items", JSON.stringify([...items, newItem]));
    // setItems();
    setNextId(nextId + 1);
  };

  return (
    <div className="container">
      <Form addItem={addItem} />
      <ItemList items={items} />
    </div>
  );
};

export default FormWithList;
