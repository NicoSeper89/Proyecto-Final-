import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useAuth0 /*User*/ } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export default function Baneado() {
  const { logout } = useAuth0();
  const history = useHistory();

  const handle = () => {
    window.localStorage.removeItem("User")
    logout()
    
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        py={20}
        px={6}
        position={"absolute"}
        flexDirection="column"
        textAlign="center"
        height="15rem"
        top={"10rem"}
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, orange.400, orange.600)"
          backgroundClip="text"
        >
          Usuario Bloqueado
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          ¡Ya que incumpliste los terminos y condiciones no podras acceder a tu cuenta!
        </Text>
        <Text color={"gray.500"} mb={6}>
          Te enviamos un Gmail con toda la informacion 
        </Text>
        <Button
          onClick={(e) => handle(e)}
          colorScheme="orange"
          bgGradient="linear(to-r, orange.400, orange.500, orange.600)"
          color="white"
          variant="solid"
        >
          Volver a Inicio
        </Button>
      </Box>
    </Flex>
  );
}
