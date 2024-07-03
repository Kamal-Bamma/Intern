import React, { useState, useEffect } from "react";
import Form from "./Form";
import ItemList from "./ItemList";

const FormWithList = () => {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editItemData, setEditItemData] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
    setNextId(
      storedItems.length ? storedItems[storedItems.length - 1].id + 1 : 1
    );
  }, []);

  const addItem = (title, body) => {
    const newItem = {
      id: nextId,
      title,
      body,
    };
    localStorage.setItem("items", JSON.stringify([...items, newItem]));
    setItems([...items, newItem]);
    setNextId(nextId + 1);
  };

  const updateItem = (id, title, body) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, title, body } : item
    );
    setItems(updatedItems);
    setEditMode(false);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setEditItemData({});
  };

  const deleteItem = (id) => {
    const deleted = items.filter((item) => item.id !== id);
    setItems(deleted);
    localStorage.setItem("items", JSON.stringify(deleted));
  };

  const startEditItem = (item) => {
    setEditItemData(item);
    setEditMode(true);
  };

  return (
    <div className="container">
      <Form
        addItem={addItem}
        editMode={editMode}
        updateItem={updateItem}
        editItemData={editItemData}
      />
      <ItemList
        items={items}
        deleteItem={deleteItem}
        startEditItem={startEditItem}
      />
    </div>
  );
};

export default FormWithList;
