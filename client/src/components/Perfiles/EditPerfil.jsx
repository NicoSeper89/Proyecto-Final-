import React, { useState } from "react";
import { Box, Button, Flex, FormLabel, Heading, Input } from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import { editUser, getInfoUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import UserUploadImg from "../UploadImg/UserUploadImg";
import AlertPerfil from "./AlertPerfil";

export default function EditPerfil(props) {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.infoUser);
  const [disabledButton, setDisabledButton] = useState(false);
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [input, setInput] = useState({
    name: "",
    city: "",
    description: "",
  });

  useEffect(() => {
    if (!Object.entries(infoUser).length) {
      dispatch(getInfoUser(props.match.params.id));
    } else {
      setInput({
        name: infoUser[0].name,
        city: infoUser[0].city,
        description: infoUser[0].description,
      });
    }
  }, [dispatch, props.match.params.id, infoUser]);

  useEffect(() => {
    !input.name || !input.city || /^[\s]+$/i.test(input.description)
      ? setDisabledButton(true)
      : setDisabledButton(false);
  }, [input.name, input.city]);

  function handleEdit(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editUser(infoUser[0].id, input));

    let user = infoUser;
    user[0].city = input.city;
    user[0].name = input.name;
    user[0].description = input.description;
    window.localStorage.setItem("User", JSON.stringify(user));

    setAlertSubmit([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <Box>
      <NavBarForms />
      <Box
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        color={"gray.700"}
        bg={"blackAlpha.200"}
        p={"3rem"}
      >
        <Flex
          position="relative"
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          wrap="wrap"
          overflow="hidden"
          w={"80%"}
        >
          <Box bg={"#F6AD55"} borderRadius={".2rem"} p={"1rem 0rem"} mb={"1rem"}>
            <Heading
              color={"white"}
              textShadow={"gray .1rem .1rem .2rem"}
              textAlign={"center"}
              fontSize="2.0rem"
            >
              EDITAR PERFIL
            </Heading>
          </Box>
          <Box
            p={"1rem"}
            w={"80%"}
            overflow="hidden"
            display={"flex"}
            flexDirection="column"
            border="1px"
            borderColor="gray.200"
            bg={"white"}
          >
            <FormLabel fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500" required>
              Nombre:{" "}
            </FormLabel>
            <Input type="text" name={"name"} value={input.name} onChange={handleEdit} />

            <FormLabel fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500" required>
              Ciudad:{" "}
            </FormLabel>
            <Input type="text" name={"city"} value={input.city} onChange={handleEdit} />

            <FormLabel fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500" required>
              Descripción:{" "}
            </FormLabel>
            <Input
              type="text"
              name={"description"}
              value={input.description}
              onChange={handleEdit}
            />

            {/* <FormLabel fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500" required>
              Whatsapp de contacto:{" "}
            </FormLabel>
            <Input
              type="text"
              name={"contacto"}
              value={input.contacto}
              onChange={handleEdit}
              color="gray.500"
              borderColor="gray.200"
            /> */}

            <FormLabel fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500" required>
              Foto de perfil:{" "}
            </FormLabel>
            <Box w={"100%"}>
              <UserUploadImg />
            </Box>
          </Box>
          <Flex justifyContent={"flex-end"} p={"1rem"}>
            <Button
              w={"30%"}
              fontSize="xl"
              colorScheme="blue"
              type="submit"
              value="enviar"
              onClick={handleSubmit}
              disabled={disabledButton}
            >
              Confirmar cambios
            </Button>
          </Flex>
          <Box
            position={"absolute"}
            display={!alertSubmit[0] ? "none" : "flex"}
            bg={"blackAlpha.100"}
            w={"full"}
            h={"full"}
          >
            <AlertPerfil alertSubmit={alertSubmit} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
