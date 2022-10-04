import React from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
/* import emailjs from "emailjs-com"; */
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {deletePublicaction} from "../../redux/actions/index.js"

export default function RequestScore(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const dispatch = useDispatch()

  const [email, setEmail] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    try {

      await axios.put(`user/requestScore/${props.publicationsId}`, {userEmail: email})
      dispatch(deletePublicaction(props.publicationsId))
      /* await emailjs.sendForm("service_0za37f4", "template_3aag90l", e.target, "E_nOOl9VRDZAxSlhF") */
      history.push("/")

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Button w={"350px"} colorScheme="green" m="8px" fontSize="xl" as="b" onClick={onOpen}>
        Solicitar puntuación
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solicitar puntuacion a un inquilino</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={sendEmail}>
              <FormLabel>Email</FormLabel>
              <FormControl display={"flex"} flexDirection={"column"} gap={".4rem"}> 
                <Input
                  ref={initialRef}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  name="user_email"
                />
                <Flex gap={".1rem"}>
                <Input
                  display={"none"}
                  value={`http://localhost:3000/details/${props.publicationsId}/rank`}
                  name="url_publication"
                  readOnly
                />
                <Button type="submit" colorScheme="green" mr={3}>
                  Enviar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
                </Flex>
              </FormControl>
            </form>
            <Text paddingTop={"1.4rem"} textAlign={"justify"}>Pedir a otro usuario que califique tu publicación hará que sea eliminada de las publicaciones activas. <br /> Puedes pedir su restauración luego, pero estará sujeta a revisión. <br /> Tu publicación seguira apareciendo en tu perfil, en la seccion "publicaciones borradas"
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
