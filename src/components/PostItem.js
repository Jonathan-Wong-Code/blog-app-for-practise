import React from "react";
import { Link } from "react-router-dom";

import { useRemovePost } from "../utils/posts";
const PostItem = ({ post }) => {
  const [remove, { isLoading }] = useRemovePost(post);

  return (
    <>
      <h3>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p>Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
      <button onClick={() => remove(post.id)} disabled={isLoading}>
        Delet{isLoading ? "ing" : "e"} post
      </button>
    </>
  );
};

export default PostItem;
