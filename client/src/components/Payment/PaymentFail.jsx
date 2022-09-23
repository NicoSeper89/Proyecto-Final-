import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

export default function PaymentFail() {
  const history = useHistory();
  const onDown = () => {
    history.push("/");
  };
  const onPerfil = () => {
    history.push("/perfilPropietario");
  };
  return (
    <Alert
      position={"absolute"}
      // display={!alertSubmit[0] ? "none" : "flex"}
      // status={!alertSubmit[1] ? "error" : "success"}
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0}></AlertIcon>
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Falló, no se pudo destacar tu publicación
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Recordá que podes destacar tu publicación ingresando a tu perfil
      </AlertDescription>
      <Button onClick={onPerfil}>Ir al Perfil</Button>
      <Button onClick={onDown}>Volver al inicio</Button>
    </Alert>
  );
}
