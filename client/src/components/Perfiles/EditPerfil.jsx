import React, { useState } from "react";
import { Avatar, Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import Rating from "./Rating";
import { editUser, getInfoUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import UserUploadImg from "../UploadImg/UserUploadImg";

export default function EditPerfil(props) {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.infoUser);
  const [input, setInput] = useState({
    img: [],
    name: "",
    ciudad: "",
    description: "",
    contacto: "",
  });

  function handleEdit(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editUser(infoUser.id, input));
  }

  // useEffect(() => {
  //   if (!Object.entries(infoUser).length) {
  //     dispatch(getInfoUser(props.match.params.id));
  //   } else {
  //     setInput({
  //       ciudad: infoUser.property.city.name,
  //       img: [...infoUser.property.propertyImages],
  //       description: infoUser.description,
  //       premium: infoUser.premium,
  //     });
  //   }
  // }, [dispatch, props.match.params.id, infoUser]);

  //aa
  return (
    <Box>
      <NavBarForms />
      <Box bg={"facebook.300"} borderRadius={".2rem"} w={"57.7%"} p={"1rem"}>
        <Heading
          color={"white"}
          textShadow={"gray .1rem .1rem .2rem"}
          textAlign={"center"}
          fontSize="2.5rem"
        >
          {" "}
          Editar Perfil
        </Heading>
      </Box>
      <Box>
        <FormLabel htmlFor="">Nombre: </FormLabel>
        <Input type="text" name={"name"} value={input.name} onChange={handleEdit} />

        <FormLabel htmlFor="">Ciudad: </FormLabel>
        <Input type="text" name={"ciudad"} value={input.ciudad} onChange={handleEdit} />

        <FormLabel htmlFor="">Descripción: </FormLabel>
        <Input type="text" name={"description"} value={input.description} onChange={handleEdit} />

        <FormLabel htmlFor="">Whatsapp de contacto: </FormLabel>
        <Input type="text" name={"contacto"} value={input.contacto} onChange={handleEdit} />

        <FormLabel htmlFor="">Foto de perfil: </FormLabel>
        <Input type="text" name={"img"} value={input.img} onChange={handleEdit} />
        <Box>
          <UserUploadImg input={input} setInput={setInput} />
        </Box>
      </Box>
      <Button type="submit" value="enviar" onClick={handleSubmit}>
        Confirmar cambios
      </Button>
    </Box>
  );
}
