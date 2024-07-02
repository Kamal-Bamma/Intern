// import React from "react";
// import { Link } from "react-router-dom";

// const Post = (props) => {
//   return (
//     <>
//       <div className="post-container">
//         <p>
//           <Link to={`/SinglePost/${props.id}`}>
//             <b>Id:</b> {props.id}
//           </Link>
//         </p>
//         <p>
//           <b>Title:</b> {props.title}
//         </p>
//         <p>
//           <b>Body:</b> {props.body}
//         </p>
//       </div>
//     </>
//   );
// };

// export default Post;
import React from "react";
import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <div className="post-container">
      <p>
        <Link to={`/post/${props.id}`}>
          <b>Id:</b> {props.id}
        </Link>
      </p>
      <p>
        <b>Title:</b> {props.title}
      </p>
      <p>
        <b>Body:</b> {props.body}
      </p>
    </div>
  );
};

export default Post;
