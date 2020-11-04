import React from "react";
import PostForm from "./PostForm";
import { useCreatePost } from "../utils/posts";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [create, { isLoading, isError, error, isSuccess }] = useCreatePost();
  const history = useHistory();

  React.useLayoutEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
  }, [isSuccess, history]);

  return (
    <section>
      <h2>Create A New Post</h2>
      {isLoading ? (
        <div>Creating new post...</div>
      ) : (
        <PostForm
          type="create-post"
          onSubmit={create}
          isError={isError}
          error={error}
        />
      )}
    </section>
  );
};

export default CreatePost;
