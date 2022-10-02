import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Alert, AlertIcon, AlertDescription, useToast, Flex } from "@chakra-ui/react";

const AlertPerfil = ({ alertSubmit }) => {
  const history = useHistory();
  const toast = useToast();

  const onDown = () => {
    history.push("/");
    toast({
      title: "Perfil editado correctamente.",
      status: "success",
      isClosable: true,
    });
  };
  const onUser = () => {
    history.push("/perfilPropietario");
    toast({
      title: "Perfil editado correctamente.",
      status: "success",
      isClosable: true,
    });
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
      <Flex direction={"row"} justifyContent="center">
        <Button m={"1rem"} onClick={onUser}>
          Aceptar
        </Button>

        <Button m={"1rem"} onClick={onDown}>
          Volver al inicio
        </Button>
      </Flex>
    </Alert>
  );
};

export default AlertPerfil;
