import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>ID: {post.id}</h1>
      <h2>Title: {post.title}</h2>
      <p>
        <b>Body:</b> {post.body}
      </p>
      <br />
      <Link to="/">Back to Post List</Link>
    </div>
  );
}

export default SinglePost;
