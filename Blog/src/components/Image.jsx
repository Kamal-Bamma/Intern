import React from "react";

const Image = (props) => {
  return (
    <div className="image-container">
      <img src={props.image} />
      <p>Author: {props.auth}</p>
    </div>
  );
};

export default Image;
