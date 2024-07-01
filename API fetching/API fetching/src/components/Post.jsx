import React from "react";

const Post = (props) => {
  return (
    <>
      <div className="post-container">
        <p>
          <b>Id:</b> {props.id}
        </p>
        <p>
          <b>Title:</b> {props.title}
        </p>
        <p>
          <b>Body:</b> {props.body}
        </p>
      </div>
    </>
  );
};

Post.propTypes = {};

export default Post;
