// import React from "react";
// import { useState, useEffect } from "react";
// import Post from "./Post";

// const Fetch = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => response.json())
//       .then((data) => setPosts(data));
//   }, []);

//   return (
//     <>
//       {posts.map((post, index) => (
//         <Post key={index} id={post.id} title={post.title} body={post.body} />
//       ))}
//     </>
//   );
// };

// export default Fetch;

import React, { useState, useEffect } from "react";
import Post from "./Post";

const Fetch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} title={post.title} body={post.body} />
      ))}
    </>
  );
};

export default Fetch;
