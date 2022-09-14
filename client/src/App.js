import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";

function App() {
  return <Route exact path="/" component={Home} />;
}

export default App;
