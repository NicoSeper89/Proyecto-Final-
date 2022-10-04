import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { deleteComment } from "../../redux/actions";

const AlertDeleteComent = ({ alertComent, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onDown = () => {
    history.goBack();
  };
  const onSi = () => {
    dispatch(deleteComment(id));
    // history.push("/");
  };
  const onNo = () => {
    history.push("/");
  };

  return (
    <Alert
      position={"absolute"}
      display={!alertComent[0] ? "none" : "flex"}
      status={!alertComent[1] ? "error" : "info"}
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
        {!alertComent[1]
          ? "el comentario no se pudo borrar, lo sentimos mucho!"
          : "el comentario se borro correctamente"}
      </AlertTitle>
      <AlertDescription maxWidth="sm">Muchas gracias por utilizar nuestra web!</AlertDescription>
      <Button onClick={onDown}>continuar</Button>
    </Alert>
  );
};

export default AlertDeleteComent;
