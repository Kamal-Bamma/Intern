import React, { useState } from "react";

const Form = () => {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      setError("Both title and body are required.");
      return;
    }

    const newItem = {
      id: nextId,
      title: title,
      body: body,
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);
    setTitle("");
    setBody("");
    setError("");
  };

  return (
    <div className="container">
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
          Submit
        </button>
      </form>

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <h3>{item.id}</h3>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
