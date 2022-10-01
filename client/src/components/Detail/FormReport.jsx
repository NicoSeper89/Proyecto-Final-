import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reportPublication } from "../../redux/actions";

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

const type = [
  { name: "La imagen no se  corresponde con los detalles" },
  { name: "La imagen no es original del dueño" },
  { name: "La imagen contiene contenido explicito" },
  { name: "La descripcion contiene vocabulario no apropiado" },
  { name: "La imagen no es apropiada" },
  { name: "El inmueble ya esta alquilado" },
  { name: "Es un intento de estafa" },
  { name: "Problemas con el propietario" },
  { name: "Otros..." },
];

export default function FormReport({ id, userId }) {
  // /publications/report/id ---> por params el id de la publicacion (props.match.params.id)
  //por body recibe type(el resultado del select), info(text del report)
  //y userId(el id del usuario que realiza el report)
  //useeffect si existe el detail que no lo traiga, sino si

  const history = useHistory();
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.infoUser);
  const infoDetail = useSelector((state) => state.detail);
  //   const [disableButtonSubmit, setDisableButtonSubmit] = useState(true);
  //   const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [errors, setErrors] = useState({});

  //   const dataUser = window.localStorage.getItem("User");
  //   const infooo = JSON.parse(dataUser);
  //   const dataDetail = window.localStorage.getItem("id");

  //   useEffect(() => {
  //     dataUser && dispatch(getInfoUser(JSON.parse(dataUser)));
  //   }, []);

  const [input, setInput] = useState({
    userId: infoUser.userId,
    type: "",
    info: "",
  });

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
      dispatch(reportPublication(infoDetail.id, input));
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

  return (
    <Box>
      <Box
        bg={"blackAlpha.200"}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"gray.700"}
        w={"500px"}
        h={"250px"}
      >
        <Box bg={"#F6AD55"} borderRadius={".2rem"} w={"100%"}>
          <Heading
            color={"white"}
            textShadow={"gray .1rem .1rem .2rem"}
            textAlign={"center"}
            fontSize="1.2rem"
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
          width={"100%"}
        >
          <FormControl
            bg={"white"}
            display={"flex"}
            flexDirection={"column"}
            w={"100%"}
            overflow="hidden"
            p="10px"
          >
            <FormLabel>
              <Text fontWeight={"semiBold"} fontSize="1.0rem" color="gray.500">
                Elija el motivo del reporte
              </Text>
              <Select
                color="gray.500"
                placeholder="Motivo de report..."
                name={"type"}
                onChange={onChangeInput}
              >
                {type.map((t, i) => (
                  <option key={i} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </Select>
              {errors.type && <span>{errors.type}</span>}
            </FormLabel>
            <FormLabel>
              <Text fontWeight={"semiBold"} fontSize="1.0rem" color="gray.500">
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
              colorScheme="green"
              type="submit"
              value={"enviar"}
              onClick={onSubmitForm}
            >
              Enviar
            </Button>
          </FormControl>
        </Flex>
      </Box>
    </Box>
  );
}
