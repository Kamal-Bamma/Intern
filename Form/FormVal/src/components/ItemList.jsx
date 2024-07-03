import React from "react";
import Item from "./Item";

const ItemList = ({ items, deleteItem, startEditItem }) => {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          title={item.title}
          body={item.body}
          deleteItem={deleteItem}
          startEditItem={startEditItem}
        />
      ))}
    </ul>
  );
};

export default ItemList;
