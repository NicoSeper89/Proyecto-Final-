import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About";
import Help from "./components/Help/Help";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/help" component={Help} />
    </BrowserRouter>
  );
}

export default App;
