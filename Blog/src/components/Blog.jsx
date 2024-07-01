import React from "react";

const Blog = (props) => {
  return (
    <>
      <div className="img-cont">
        <img src={props.img} alt="" />
        <h4>Category: {props.category}</h4>
        <p>Title: {props.title}</p>
        <p>Description: {props.desc}</p>
      </div>
    </>
  );
};

export default Blog;
