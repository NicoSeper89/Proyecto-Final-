import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createPost" component={CreatePost} />
        <Route exact path="/about" component={About} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/details/:id" component={Detail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/checkin" component={NewUser} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
}

export default App;
