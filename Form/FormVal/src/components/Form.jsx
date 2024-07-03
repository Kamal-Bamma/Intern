import React, { useState, useEffect } from "react";

const Form = ({ addItem, editMode, updateItem, editItemData }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editMode) {
      setTitle(editItemData.title);
      setBody(editItemData.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editMode, editItemData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      setError("Both title and body are required.");
      return;
    }

    if (editMode) {
      updateItem(editItemData.id, title, body);
    } else {
      addItem(title, body);
    }

    setTitle("");
    setBody("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="form-control"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn">
        {editMode ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default Form;
