import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";

const Fetch = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          <Post key={index} id={post.id} title={post.title} body={post.body} />
        ))}
      </ul>
    </div>
  );
};

export default Fetch;
