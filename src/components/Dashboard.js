import React from "react";
import { usePosts } from "../utils/posts";
import PostItem from "./PostItem";

const Dashboard = () => {
  const { data, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>
          <PostItem post={post} />
        </li>
      ))}
    </ul>
  );
};

export default Dashboard;
