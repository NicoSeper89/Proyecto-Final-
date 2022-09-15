import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CreatePost from './components/CreatePost/CreatePost.jsx'

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/createPost" component={CreatePost} />
    </>
  )
}

export default App;
