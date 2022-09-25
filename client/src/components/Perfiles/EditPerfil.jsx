import React, { useState } from "react";
import { Avatar, Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import Rating from "./Rating";
import { editUser, getInfoUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import UserUploadImg from "../UploadImg/UserUploadImg";
import { useHistory } from "react-router-dom";

export default function EditPerfil(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const infoUser = useSelector((state) => state.infoUser);
  const [disabledButton, setDisabledButton] = useState(false);
  const [input, setInput] = useState({
    // img: "",
    name: "",
    city: "",
    description: "",
    // contacto: "",
  });

  useEffect(() => {
    if (!Object.entries(infoUser).length) {
      dispatch(getInfoUser(props.match.params.id));
    } else {
      setInput({
        // img: infoUser.propertyImages,
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
    console.log("ACAAAA: ", input);
    dispatch(editUser(infoUser[0].id, input));
    let user = infoUser;
    user[0].city = input.city;
    user[0].name = input.name;
    user[0].description = input.description;
    window.localStorage.setItem("User", JSON.stringify(user));
    alert("perfil actualizado");
    history.push("/perfilPropietario");
  }

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
        <Input type="text" name={"city"} value={input.city} onChange={handleEdit} />

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
      <Button type="submit" value="enviar" onClick={handleSubmit} disabled={disabledButton}>
        Confirmar cambios
      </Button>
    </Box>
  );
}
