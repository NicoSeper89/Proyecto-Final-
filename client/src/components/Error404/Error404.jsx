import React from "react";
import { Box, Heading, Text, Button, Link, Flex } from "@chakra-ui/react";

export default function Error404() {
  return (
    <Flex justifyContent={"center"} alignContent={"center"}>
      <Box textAlign="center" py={20} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, orange.400, orange.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          La página que busca no parece existir.
        </Text>

        <Link to="/">
          <Button
            colorScheme="orange"
            bgGradient="linear(to-r, orange.400, orange.500, orange.600)"
            color="white"
            variant="solid"
          >
            Volver a Inicio
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
