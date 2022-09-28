import React from "react";
import {
    Box,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useState } from "react";
import emailjs from 'emailjs-com';
import { useHistory } from "react-router-dom";

export default function RequestScore() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [email, setEmail] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();

      await emailjs.sendForm("service_0za37f4", "template_3aag90l", e.target, "E_nOOl9VRDZAxSlhF")
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
    };

    return (
        <>
            <Button
                w={"350px"}
                colorScheme="green"
                m="8px"
                fontSize="xl"
                as="b" onClick={onOpen}>Solicitar puntuación</Button>

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
                            <FormControl >
                                <FormLabel>Email</FormLabel>
                                <Input ref={initialRef} onChange={(e) => {setEmail(e.target.value); }} value={email} name="user_email" />
                                <Input display={"none"} value={`http://localhost:3000${history.location.pathname}/rank`} name="url_publication" readOnly/>
                                <Button type="submit" colorScheme='green' mr={3}>
                                    Enviar
                                </Button>
                                <Button onClick={onClose}>Cancelar</Button>
                            </FormControl>
                        </form>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )

}