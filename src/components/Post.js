import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { usePost } from "../utils/posts";

const Post = () => {
  const { id } = useParams();

  const { data: post, isLoading } = usePost(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <h3>{post.title}</h3>
      <p>created: {new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{post.blogPost}</p>
      <Link to={`/editPost/${post.id}`} className="link-button">
        Edit Post
      </Link>
    </section>
  );
};

export default Post;
