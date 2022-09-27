import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reportPublication } from "../../redux/actions";
import Footer from "../Footer/Footer";
import NavBarForms from "../NavBar/NavBarForms";

function validation(input) {
  let errors = {};

  if (!input.type) {
    errors.type = "El tipo de reporte es requerido.";
  }

  if (!input.info) {
    errors.info = "La descripción del reporte es requerida.";
  }

  if (input.info.length <= 2 || input.info.length >= 120) {
    errors.info = "La descripción del reporte debe tener de 2 a 120 dígitos.";
  }
  return errors;
}

export default function FormReport(props) {
  // /publications/report/id ---> por params el id de la publicacion (props.match.params.id)
  //por body recibe type(el resultado del select), info(text del report)
  //y userId(el id del usuario que realiza el report)

  const history = useHistory();
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.infoUser);
  //   const [disableButtonSubmit, setDisableButtonSubmit] = useState(true);
  //   const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    id: infoUser.userId,
    type: "",
    info: "",
  });

  //   useEffect(() => {
  //     !input.type || !input.info || input.info.length <= 2 || input.info.length >= 120
  //       ? setDisableButtonSubmit(true)
  //       : disableButtonSubmit(false);
  //   }, [input.type, input.info]);

  const onChangeInput = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validations = validation(newInput);
      setErrors(validations);
      return newInput;
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (input.type && input.info) {
      dispatch(reportPublication(props.match.params.id, input));
      alert("Su reporte fue enviado correctamente");
      setInput({
        type: "",
        info: "",
      });
      history.push("/");
    } else {
      alert("Te falta completar datos");
    }
  };

  const type = [1, 2, 3];

  return (
    <Box>
      <NavBarForms />

      <Box
        bg={"blackAlpha.200"}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        color={"gray.700"}
        p={"100px"}
      >
        <Box bg={"#F6AD55"} borderRadius={".2rem"} w={"70%"} p={"1rem 0rem"} m={"1rem"}>
          <Heading
            color={"white"}
            textShadow={"gray .1rem .1rem .2rem"}
            textAlign={"center"}
            fontSize="2.0rem"
          >
            REPORTAR PUBLICACIÓN
          </Heading>
        </Box>
        <Flex
          position="relative"
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          wrap="wrap"
          overflow="hidden"
          minWidth={"57.7%"}
          width={"100%"}
        >
          <FormControl
            bg={"white"}
            display={"flex"}
            flexDirection={"column"}
            p={"1rem"}
            w={"60%"}
            gap=".5rem"
            overflow="hidden"
          >
            <FormLabel>
              <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                Elija el motivo del reporte
              </Text>
              <Select color="gray.500" placeholder=" " name={"type"} onChange={onChangeInput}>
                {type.map((t, i) => (
                  <option key={i} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </Select>
              {errors.type && <span>{errors.type}</span>}
            </FormLabel>
            <FormLabel>
              <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                Describa el motivo
              </Text>
              <Textarea
                name={"info"}
                value={input.info}
                size="sm"
                resize={"none"}
                onChange={onChangeInput}
              />
              {errors.info && <span>{errors.info}</span>}
            </FormLabel>
            <Button
              // disabled={disableButtonSubmit}
              alignSelf={"center"}
              colorScheme="blue"
              type="submit"
              value={"enviar"}
              onClick={onSubmitForm}
            >
              Enviar
            </Button>
          </FormControl>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
}
