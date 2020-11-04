import React, { useReducer } from "react";

const { v4: uuidv4 } = require("uuid");
const reducer = (oldState, newState) => ({ ...oldState, ...newState });

const PostForm = ({ onSubmit, isError, error, originalPost }) => {
  const [{ title, blogPost }, setState] = useReducer(reducer, {
    title: originalPost ? originalPost.title : "",
    blogPost: originalPost ? originalPost.blogPost : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({
        title,
        blogPost,
        createdAt: originalPost ? originalPost.createdAt : Date.now(),
        id: originalPost ? originalPost.id : uuidv4(),
      });
    } catch (error) {}
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="label">
            Enter title:
          </label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={(e) => setState({ title: e.target.value })}
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label htmlFor="body" className="label">
            Enter body:
          </label>
          <textarea
            type="text"
            value={blogPost}
            id="body"
            onChange={(e) => setState({ blogPost: e.target.value })}
            placeholder="Enter blog body"
          ></textarea>
        </div>

        <button type="submit">Submit</button>
        {isError && <p>{error.response.data.message}</p>}
      </form>
    </section>
  );
};

export default PostForm;
