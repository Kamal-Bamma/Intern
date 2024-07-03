import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const Item = ({ id, title, body, deleteItem, startEditItem }) => {
  return (
    <li className="item">
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="btn-Container">
        <button
          onClick={() => startEditItem({ id, title, body })}
          className="btn-edit"
        >
          <FiEdit />
        </button>
        <button onClick={() => deleteItem(id)} className="btn-del">
          <MdDeleteOutline />
        </button>
      </div>
    </li>
  );
};

export default Item;
