import React from "react";
import style from "./Check_in.module.css";
import {
  Input,
  Box,
  InputGroup,
  Button,
  InputRightElement,
  Radio,
  HStack,
  RadioGroup,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import logoImg from "../../Image/Logo LookHouse.png";
import { Link } from "react-router-dom";
import { useState } from "react";

var gmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{3})$/ //ragex para validar gmail

const NewUser = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [datos, setDatos] = useState({ NDU: "", gmail: "", contraseña: "", TDU: "" })

  const changes = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }
  const createUser = () => {
  console.log(datos)
  setDatos({ NDU: "", gmail: "", contraseña: "", TDU: "" })
  
  }
  

  var si_no = true
  if(gmail.test(datos.gmail) && datos.NDU.length > 5 && datos.contraseña.length > 8 && datos.TDU !== "")  si_no = false
  else si_no = true
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
          <label htmlFor="">Nombre De Usuario</label>
          <Input placeholder="Nombre..." name="NDU" onChange={changes} value={datos.NDU} />
        </Box>
        <Box className={style.input}>
          <label htmlFor="">E-mail</label>
          <Input placeholder="E-mail..." name="gmail" onChange={changes} value={datos.gmail} />
        </Box>

        <Box className={style.input}>
          <label htmlFor="">Contraseña</label>
          <InputGroup size="md">
            <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Contraseña.." name="contraseña" onChange={changes} value={datos.contraseña} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box className={style.titulo}>
          <label htmlFor="">Tipo De Usuario:</label>
        </Box>

        <Box className={style.input}>
          <RadioGroup defaultValue='Itachi'>
            <HStack spacing='24px' onChange={changes}>
              <Radio value='Inquilino' name="TDU">Inquilino</Radio>
              <Radio value='Propietario' name="TDU">Propietario</Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Box className={style.btn}>
          <Button colorScheme='blue' onClick={createUser} disabled={si_no}>Crear</Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewUser;
