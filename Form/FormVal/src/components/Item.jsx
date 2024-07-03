import React from "react";

const Item = ({ title, body }) => {
  return (
    <li className="item">
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  );
};

export default Item;
