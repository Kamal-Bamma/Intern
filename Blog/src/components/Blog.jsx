import React from "react";
import img1 from "../assets/img1.jpg";

const Blog = (props) => {
  return (
    <>
      <div className="img-cont">
        <img src={props.img} alt="" />
        <h4>Category: {props.category}</h4>
        <p>Title: {props.title}</p>
        <p>Description: {props.desc}</p>
        <p>Author: {props.auth}</p>
      </div>
    </>
  );
};

export default Blog;
