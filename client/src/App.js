import "./App.css";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home.jsx";
import CreatePost from "./components/CreatePost/CreatePost.jsx";
import About from "./components/About/About";
import Help from "./components/Help/Help";
import Detail from "./components/Detail/Detail";
import NewUser from "./components/Check_in/Check_in";
import Error404 from "./components/Error404/Error404.jsx";
import { getCities, getServices, getTypesOfProperties } from "./redux/actions/index.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
    dispatch(getServices());
    dispatch(getTypesOfProperties());
  });

  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/createPost" component={CreatePost} />
      <Route path="/about" component={About} />
      <Route path="/help" component={Help} />
      <Route path="/details/:id" component={Detail} />
      <Route path="/login" component={Login} />
      <Route path="/checkin" component={NewUser} />
      <Route path="/error404" component={Error404} />
    </>
  );
}

export default App;
