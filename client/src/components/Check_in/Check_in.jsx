import React from "react";
import style from "./Check_in.module.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Input,
  Box,
  Button,
  InputRightElement,
  Radio,
  HStack,
  RadioGroup,
  FormLabel,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import logoImg from "../../Image/Logo LookHouse.png";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useEffect } from "react";

var mail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{3})$/; //ragex para validar mail

const NewUser = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [datos, setDatos] = useState({ name: "", mail: "", password: "", typUser: "" });

  var isError;
  var isError2;
  var isError3;

  datos.mail.length > 0 && !mail.test(datos.mail) ? (isError = true) : (isError = false);

  datos.password.length > 0 && datos.password.length < 8 ? (isError2 = true) : (isError2 = false);

  datos.name.length > 0 && datos.name.length < 4 ? (isError3 = true) : (isError3 = false);

  const changes = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  const createUser = async () => {
    await axios
      .post("/user/users", { name: datos.name, typUser: datos.typUser })
      .then(
        await axios.post("/user/login", {
          name: datos.name,
          password: datos.password,
          mail: datos.mail,
        })
      );

    setDatos({ name: "", mail: "", password: "", typUser: "" });
  };

  var si_no = true;
  if (
    datos.name.length > 3 &&
    mail.test(datos.mail) &&
    datos.password.length > 7 &&
    datos.typUser !== ""
  )
    si_no = false;
  else si_no = true;
  var usuario = user;

  // const loginGoogle = async () => {
  //     const redirec = await loginWithRedirect()
  //     console.log(user)

  //     //  setDatos({ name: usuario.nickname, mail: usuario.email, password: "", typUser: "" })
  // }

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

      <form className={style.form}>
        <Box className={style.titulo}>
          <h1>Crear Usuario:</h1>
        </Box>

        <Box className={style.input}>
          <FormControl isInvalid={isError3}>
            <FormLabel>Nombre De Usuario</FormLabel>
            <Input value={datos.name} onChange={changes} name="name" placeholder="Nombre..." />
            {isError3 ? (
              <FormErrorMessage>Tu nombre debe tener minimo 4 Caracteres</FormErrorMessage>
            ) : null}
          </FormControl>
        </Box>

        <Box className={style.input}>
          <FormControl isInvalid={isError}>
            <FormLabel>Gmail</FormLabel>
            <Input
              type="email"
              value={datos.mail}
              onChange={changes}
              name="mail"
              placeholder="Gmail..."
            />
            {isError ? <FormErrorMessage>Ingrese un Email correcto</FormErrorMessage> : null}
          </FormControl>
        </Box>

        <Box className={style.input}>
          <FormLabel>password</FormLabel>
          <FormControl size="md" isInvalid={isError2}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="password.."
              name="password"
              onChange={changes}
              value={datos.password}
            />
            <InputRightElement width="5rem" top="0.5rem">
              <Button h="1.5rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            {isError2 ? (
              <FormErrorMessage>Su password debe tener minimo 8 Caracteres</FormErrorMessage>
            ) : null}
          </FormControl>
        </Box>

        <Box className={style.titulo}>
          <label htmlFor="">Tipo De Usuario:</label>
        </Box>

        <Box className={style.input}>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px" onChange={changes}>
              <Radio value="Inquilino" name="typUser">
                Inquilino
              </Radio>
              <Radio value="Propietario" name="typUser">
                Propietario
              </Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Box className={style.btn}>
          <Button colorScheme="blue" onClick={createUser} disabled={si_no}>
            Crear
          </Button>
        </Box>
      </form>
      {!isAuthenticated && <button onClick={() => loginWithRedirect()}> login</button>}

      <br />
      {isAuthenticated && <button onClick={() => logout()}> logout</button>}
      <br />
      {isAuthenticated && (
        <button
          onClick={() =>
            setDatos({
              name: usuario.nickname,
              mail: usuario.email,
              password: usuario.sub,
              typUser: "Inquilino",
            })
          }
        >
          setear datos
        </button>
      )}
    </Box>
  );
};

export default NewUser;
