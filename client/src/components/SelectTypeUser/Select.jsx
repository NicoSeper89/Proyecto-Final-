import React /*{ ,isValidElement }*/ from "react";
import {
  // HStack,
  // Radio,
  // FormHelperText,
  // FormControl,
  // FormLabel,
  // RadioGroup,
  // Alert,
  Box,
  // useForceUpdate,
} from "@chakra-ui/react";
import { useAuth0 /*User*/ } from "@auth0/auth0-react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import AlertLogin from "./AlertLogin";
import { useEffect } from "react";
import { useState } from "react";
const Select = () => {
  const { /*isAuthenticated,*/ user, /*loginWithRedirect, logout,*/ isLoading } = useAuth0();
  // const history = useHistory();
  useEffect(() => {
    isLoading ? console.log("cargando") : buscarUser();
  }, [user]);

  var [loguear, setLoguear] = useState({loguear:undefined,banned:false });

  const buscarUser = async () => {

    const user2 = await axios.post("/user/LoginOrCreate", {

      name: user.nickname,
      password: user.sub,
      mail: user.email,
      typUser: "Inquilino",
    });
    if (user2.data.loguear && user2.data.userInfo[0].banned === false) {
      setLoguear({loguear:true,banned:false});
      window.localStorage.setItem("User", JSON.stringify(user2.data.userInfo));
    } else {
      var banned = user2.data.userInfo? user2.data.userInfo[0].banned: false
      setLoguear({loguear:false, banned});
    }
  };

  // const crearUsuario = async(e) => {

  //   if(user2.data.loguear){
  //     console.log(user2.data.loguear)
  //

  //   } else{
  //     console.log(user2.data.loguear)
  //     console.log(user2.data.mensage)
  //     alert(user2.data.mensage)
  //
  //   }

  //}

  return (
    <Box>
      <AlertLogin loguear={loguear} />
    </Box>
  );
};

export default Select;
