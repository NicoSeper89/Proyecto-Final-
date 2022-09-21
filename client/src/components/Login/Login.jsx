import React from "react";
import { useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {
  Input,
  Box,
  InputGroup,
  Button,
  InputRightElement,
  FormControl,
  FormErrorMessage
  // Stack,
  // Checkbox,
} from "@chakra-ui/react";
import logoImg from "../../Image/Logo LookHouse.png";
import { setInfoUser } from "../../redux/actions";

var name = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/ //ragex para validar gmail

const Login = () => {
  const [login, setLogin] = useState({ name: "", password: "" });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch =  useDispatch()
  const infoUsuario = useSelector(state => state.infoUser)
   
  const changes = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const log_in = async (e) => {
    // ruta para loguearme **********************************
    console.log("enviando datos", login)
   const respuesta = await axios.post("http://localhost:3001/user/logueado", login)

   if(respuesta.data.loguear) {
   dispatch(setInfoUser(respuesta.data.userInfo))
    alert(respuesta.data.mensaje)
  } else {
   alert(respuesta.data.mensaje)}
  };
  var isError
  var isError2
  
  login.name.length > 0 && login.name.length <4 ? isError = true: isError = false

  login.password.length > 0 && login.password.length < 5? isError2 = true: isError2 = false

  var si_no = true;

  if (login.name.length > 3 && login.password.length > 4) si_no = false;
  else si_no = true;

  return (
    <Box>
      <Box className={style.containerNav}>
        <Link to="/">
          <img src={logoImg} alt="homeLogo" />
        </Link>
        <Box className={style.buttons}>
          <Link to="/">
            <button>Atras</button>
          </Link>
        </Box>
      </Box>
      <form action="" className={style.continer}>

        <Box className={style.input}>
        <label htmlFor=""> Usuario</label>
          <FormControl isInvalid={isError}>
          <Input placeholder="..." name="name" onChange={changes} value={login.name} />
          {isError ? <FormErrorMessage>Su Usuario debe tener minimo 4 caracteres</FormErrorMessage> : null}
          </FormControl>
         
        </Box>
        <Box className={style.input}>
          <label htmlFor="">password</label>
          <FormControl size="md" isInvalid={isError2}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="password.."
              name="password"
              onChange={changes}
              value={login.password}
            />

            <InputRightElement width="4.5rem" top="0.4rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            {isError2 ? <FormErrorMessage>Su password debe tener minimo 5 Caracteres</FormErrorMessage> : null}
          </FormControl>
        </Box>
        <Box className={style.btn}>
          <Button colorScheme="teal" variant="outline" onClick={log_in} disabled={si_no}>
            Entrar
          </Button>
        </Box>
        <Box>
          <p>Si no tenes una cuenta, podes {<Link to="checkin">REGISTRARTE</Link>}</p>
        </Box>
      </form>
      <button onClick={() => console.log(infoUsuario)}>usuarioooo</button>
    </Box>
  );
};

export default Login;
