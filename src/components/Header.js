import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Todo App with MSW Backend and React-query fetching</h1>
      <nav>
        <NavLink to="/" exact activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/createPost" activeClassName="active">
          Create Post
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
