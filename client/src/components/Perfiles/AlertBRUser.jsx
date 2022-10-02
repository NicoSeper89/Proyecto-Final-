import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "emailjs-com";

import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Flex,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { blockUser, restoreUser } from "../../redux/actions";

const AlertBRUser = ({ alertBRUser, setAlertBRUser, userId, banned }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const [reasons, setReasons] = useState("");

  const onSi = async (e) => {
    e.preventDefault();
    try {
      if (!banned) {
        dispatch(blockUser(userId));
        /* await emailjs.sendForm("service_0za37f4", "template_wo7kki4", e.target, "E_nOOl9VRDZAxSlhF") */
        history.push("/admin");
        toast({
          title: "Perfil bloqueado correctamente.",
          status: "success",
          isClosable: true,
        });
      } else {
        dispatch(restoreUser(userId));
        /* await emailjs.sendForm("service_0za37f4", "template_wo7kki4", e.target, "E_nOOl9VRDZAxSlhF") */
        history.push("/admin");
        toast({
          title: "Perfil restaurado correctamente.",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNo = () => {
    setAlertBRUser([false, false]);
    toast({
      title: "Acción cancelada.",
      status: "error",
      isClosable: true,
    });
  };

  return (
    <Alert
      zIndex={10}
      position={"absolute"}
      display={!alertBRUser[0] ? "none" : "flex"}
      status={!alertBRUser[1] ? "error" : "info"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="23rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {banned
          ? " ¿Estás seguro de que queres restaurar al usuario?"
          : " ¿Estás seguro de que queres bloquear al usuario?"}
      </AlertTitle>
      <Flex gap={"1rem"}>
        <Button mb={"10px"} onClick={(e) => onSi(e)}>
          Si
        </Button>
        <Button onClick={(e) => onNo(e)}>No</Button>
      </Flex>
      <AlertDescription maxWidth="sm">Recorda elegir responsablemente</AlertDescription>
    </Alert>
  );
};

export default AlertBRUser;
