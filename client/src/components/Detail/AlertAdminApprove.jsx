import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
/* import emailjs from "emailjs-com"; */

import { Button, Alert, AlertIcon, AlertTitle, AlertDescription, Flex, useToast, Input } from "@chakra-ui/react";
  
import { approvePostUser } from "../../redux/actions";

const AlertAdminApprove = ({ alertSubmit, setAlertAdminApprove, pubId, userId, emailUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const onSi = () => {
    dispatch(approvePostUser(pubId, userId));
    history.push("/");
    toast({
      title: "Publicación aprobada correctamente.",
      status: "success",
      isClosable: true,
    });
  };
  const onNo = () => {
    setAlertAdminApprove([false,false])
  };

  return (
    <Alert
      position={"absolute"}
      display={!alertSubmit[0] ? "none" : "flex"}
      status={!alertSubmit[1] ? "error" : "info"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        "¿Estás seguro de que queres aprobar la publicación?"
      </AlertTitle>
      <form onSubmit={onSi}>
      <Input display={"none"} value={emailUser} name="user_email" readOnly />
      <Input display={"none"} value={pubId} name="publication_id" readOnly />
      <Flex gap={"1rem"}>
        <Button type="submit" mb={"10px"} >
          Si
        </Button>
        <Button onClick={(e) => onNo(e)}>No</Button>
      </Flex>
      </form>
      <AlertDescription maxWidth="sm">Recorda elegir responsablemente</AlertDescription>
    </Alert>
  );
};

export default AlertAdminApprove;
