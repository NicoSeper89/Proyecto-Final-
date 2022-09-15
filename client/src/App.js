import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail"

function App() {
  return(
    <Route exact path="/" component={Home} />,
    <Route path="/id"  component={Detail}/>
    ) 
}

export default App;
