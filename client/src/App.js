import "./App.css";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Login from "./components/Login/Login";
import Home from "./components/Home/Home.jsx";
import CreatePost from "./components/CreatePost/CreatePost.jsx";
import About from "./components/About/About";
import Help from "./components/Help/Help";
import Detail from "./components/Detail/Detail";
// import NewUser from "./components/Check_in/Check_in";
import Error404 from "./components/Error404/Error404.jsx";
import { getCities, getServices, getTypesOfProperties, getUserInfo } from "./redux/actions/index.js";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import PerfilPropietario from "./components/Perfiles/PerfilPropietario";
// import PerfilInquilino from "./components/Perfiles/PerfilInquilino";
import PaymentOk from "./components/Payment/PaymentOk";
// import PaymentFail from "./components/Payment/PaymentFail.jsx";
import Select from "./components/SelectTypeUser/Select";
import { useAuth0 } from "@auth0/auth0-react";
import EditPerfil from "./components/Perfiles/EditPerfil";
import AlertCard from "./components/Cards/AlertCard";
import FormReport from "./components/Detail/FormReport";
import Rank from "./components/Rank/Rank.jsx";
import AdminAcces from "./components/Administrador/AdminAcces";
import Admin from "./components/Administrador/Admin.jsx";
import deletedLogicUAd from "./components/DeleteLogicUAd/DeletedLogicUAd.jsx";
import UsersAdmin from "./components/Perfiles/UsersAdmin";
import Baneado from "./components/UsuarioBaneado/Error404";

function App() {
  const { loginWithRedirect /*, isAuthenticated, logout*/ } = useAuth0();
  const dispatch = useDispatch();

  const infoUser = useSelector((state) => state.infoUser);
  const infoUser2 = useSelector((state) => state.allUserInfo);

  const user = window.localStorage.getItem("User");
  const user2 = JSON.parse(user);

  

  useEffect(() => {
    user2 && dispatch(getUserInfo(user2[0].id));
    /* dispatch(getCities()); */
    dispatch(getServices());
    dispatch(getTypesOfProperties());
  }, [dispatch]);
  
   if(infoUser2.banned) return(<Baneado/>)
    else return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/createPost"
          render={() => {
            return user2 && !infoUser2.banned? <CreatePost /> : <Redirect to="*" />;
          }}
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/details/:id" component={Detail} />
        <Route exact path="/updatePublicaction/:id" component={UpdatePost} />
        <Route exact path="/updatePerfil/:id" component={EditPerfil} />
        
        <Route exact path="/perfilPropietario" component={PerfilPropietario} />

        <Route exact path="/redirectRegister" component={AlertCard} />

        <Route exact path="/reportPublication" component={FormReport} />
        <Route exact path="/deletedLogicUAd" component={deletedLogicUAd} />

        <Route exact path="/PaymentOk" component={PaymentOk} />
        <Route exact path="/PaymentFail" component={PaymentFail} />

        {/* //<Route
        //   exact
        //   path="/perfilPropietario"
        //   render={() => {
        //     return infoUser ? <PerfilPropietario /> : <Redirect to="*" />;
        //   }}
        // /> */}

        {/* <Route exact path="/perfilInquilino" render={() => {
          return
          return user2 && user2[0].typeOfUserId === 2? <PerfilInquilino/> :
          <Redirect to="*"/>
        }} /> */}

        <Route exact path="/select" component={Select} />
        <Route exact path="/adminAcces" component={AdminAcces} />
        <Route
          exact
          path="/details/:id/rank"
          render={({ match }) => {
            let userRank = window.localStorage.getItem("User");
            userRank = JSON.parse(userRank);

            if (userRank) {
              return <Rank match={match} userRank={userRank} />;
            } else {
              window.localStorage.setItem("Rank_Publications", match.params.id);
              return loginWithRedirect();
            }
          }}
        />
        <Route
          exact
          path="/admin"
          render={() => {
            return user2 && user2[0].admin ? <Admin /> : <Redirect to="*" />;
          }}
        />

        <Route
          exact
          path="/viewUser"
          render={() => {
            return user2 && user2[0].admin ? <UsersAdmin /> : <Redirect to="*" />;
          }}
        />

        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
}

export default App;
