import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

export default function PaymentFail() {
  const history = useHistory();
  const onDown = () => {
    history.push("/");
  };
  return (
    <Alert
      position={"absolute"}
      // display={!alertSubmit[0] ? "none" : "flex"}
      // status={!alertSubmit[1] ? "error" : "success"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0}>
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error, no se pudo destacar tu publicación
        </AlertTitle>
        <AlertDescription maxWidth="sm">Muchas gracias por utilizar nuestra web!</AlertDescription>
        <Button onClick={onDown}>Volver al inicio</Button>
      </AlertIcon>
    </Alert>
  );
}
