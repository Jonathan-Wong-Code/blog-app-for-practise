import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Dashboard from "./components/Dashboard";
import EditPost from "./components/EditPost";
import Header from "./components/Header";

import Post from "./components/Post";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/createPost" component={CreatePost} />
          <Route path="/post/:id" component={Post} />
          <Route path="/editPost/:id" component={EditPost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
