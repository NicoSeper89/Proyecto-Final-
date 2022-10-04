import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const AlertSubmitUpdate = ({ alertSubmit, premium }) => {
  const history = useHistory();

  const onDown = () => {
    history.push("/");
  };

  return (
    <Alert
      position={"absolute"}
      display={!alertSubmit[0] ? "none" : "flex"}
      status={!alertSubmit[1] ? "error" : "success"}
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
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {!alertSubmit[1]
          ? "La publicación no se pudo Actualizar, lo sentimos mucho!"
          : "La publicación se Actualizo correctamente"}
      </AlertTitle>
      <AlertDescription maxWidth="sm">Muchas gracias por utilizar nuestra web!</AlertDescription>
      <Button onClick={onDown}>Volver al inicio</Button>
      {!premium ? (
        <form action="https://pf-lookhouse.herokuapp.com/sell/premium" method="POST">
          <Button type="submit">Destacar Publicación</Button>
        </form>
      ) : null}
    </Alert>
  );
};

export default AlertSubmitUpdate;
