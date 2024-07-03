import React, { useState } from "react";

const Form = ({ addItem }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      setError("Both title and body are required.");
      return;
    }

    addItem(title, body);
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
        Submit
      </button>
    </form>
  );
};

export default Form;
