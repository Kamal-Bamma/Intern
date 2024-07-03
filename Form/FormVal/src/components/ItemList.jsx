import React from "react";
import Item from "./Item";

const ItemList = ({ items }) => {
  // console.log(items);
  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item key={item.id} title={item.title} body={item.body} />
      ))}
    </ul>
  );
};

export default ItemList;
