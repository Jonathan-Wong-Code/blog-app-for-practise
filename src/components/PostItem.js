import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRemovePost } from "../utils/posts";

const Background = styled.div`
  background-color: var(--colors-background);
  color: var(--colors-primary);
`;

const PostItem = ({ post }) => {
  const [remove, { isLoading }] = useRemovePost(post);

  return (
    <Background>
      <h3>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p>Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
      <button onClick={() => remove(post.id)} disabled={isLoading}>
        Delet{isLoading ? "ing" : "e"} post
      </button>
    </Background>
  );
};

export default PostItem;
