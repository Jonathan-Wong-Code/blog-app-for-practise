import React from "react";
import { usePost, useUpdatePost } from "../utils/posts";
import PostForm from "./PostForm";
import { useHistory, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post } = usePost(id);
  const history = useHistory();

  const [update, { isLoading, isSuccess, error, isError }] = useUpdatePost(
    id,
    post
  );

  React.useLayoutEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
  }, [isSuccess, history]);

  if (isLoading) return <div>Updating post...</div>;

  return (
    <div>
      <h2>Edit post</h2>
      <PostForm
        onSubmit={update}
        error={error}
        isError={isError}
        originalPost={post}
      />
    </div>
  );
};
export default EditPost;
