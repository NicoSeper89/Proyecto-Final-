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
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormControl
} from "@chakra-ui/react";
import logoImg from "../../Image/Logo LookHouse.png";
import { Link } from "react-router-dom";
import { useState } from "react";

var gmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{3})$/ //ragex para validar gmail

const NewUser = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [datos, setDatos] = useState({ NDU: "", gmail: "", contraseña: "", TDU: "" })

  var isError
  var isError2
  var isError3

  datos.gmail.length > 0 && !gmail.test(datos.gmail) ? isError = true : isError = false

  datos.contraseña.length > 0 && datos.contraseña.length < 8 ? isError2 = true : isError2 = false

  datos.NDU.length > 0 && datos.NDU.length < 4 ? isError3 = true : isError3 = false

  const changes = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }
  const createUser = () => {
    console.log(datos)
    console.log(isError)
    setDatos({ NDU: "", gmail: "", contraseña: "", TDU: "" })
    

  }

  var si_no = true
  if (datos.NDU.length > 3 && gmail.test(datos.gmail) && datos.contraseña.length >7 && datos.TDU !== "") si_no = false
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
          <FormControl isInvalid={isError3}>
            <FormLabel>Nombre De Usuario</FormLabel>
            <Input
              value={datos.NDU}
              onChange={changes}
              name="NDU"
              placeholder="Nombre..."
            />
            {isError3 ? <FormErrorMessage>Tu nombre debe tener minimo 4 Caracteres</FormErrorMessage> : null}

          </FormControl>
        </Box>

        <Box className={style.input}>
          <FormControl isInvalid={isError}>
            <FormLabel>Gmail</FormLabel>
            <Input
              type='email'
              value={datos.gmail}
              onChange={changes}
              name="gmail"
              placeholder="Gmail..."
            />
            {isError ? <FormErrorMessage>Ingrese un Email correcto</FormErrorMessage> : null}

          </FormControl>
        </Box>

        <Box className={style.input}>
          <FormLabel>Contraseña</FormLabel>
          <FormControl size="md" isInvalid={isError2}>
            <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Contraseña.." name="contraseña" onChange={changes} value={datos.contraseña} />
            <InputRightElement width="5rem" top="0.5rem">
              <Button h="1.5rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            {isError2 ? <FormErrorMessage>Su contraseña debe tener minimo 8 Caracteres</FormErrorMessage> : null}
          </FormControl>

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
