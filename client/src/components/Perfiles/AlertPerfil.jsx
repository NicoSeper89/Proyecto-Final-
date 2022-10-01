import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const AlertPerfil = ({ alertSubmit }) => {
  const history = useHistory();

  const onDown = () => {
    history.push("/");
  };
  const onUser = () => {
    history.push("/perfilPropietario");
  };

  return (
    <Alert
      position={"absolute"}
      display={"flex"}
      status={"success"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
      gap={"0.5rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      {/* <AlertTitle mt={4} mb={1} fontSize="lg">
        {!alertSubmit[1]
          ? "La publicación no se pudo Actualizar, lo sentimos mucho!"
          : "La publicación se Actualizo correctamente"}
      </AlertTitle> */}
      <AlertDescription maxWidth="sm">Perfil Actualizado!</AlertDescription>
      <Button onClick={onUser}>Aceptar</Button>
      <br />
      <Button onClick={onDown}>Volver al inicio</Button>
    </Alert>
  );
};

export default AlertPerfil;
