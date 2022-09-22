import React from "react";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { Box, Button, Container, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    // <div className={style.container}>
    //   <div className={style.containerIcons}>
    //     <a href="https://github.com/TomasTinto1234/Proyecto-Final-">
    //       <FontAwesomeIcon icon={faSquareGithub} />
    //     </a>
    //     <FontAwesomeIcon icon={faSquareInstagram} />
    //     <FontAwesomeIcon icon={faSquareTwitter} />
    //   </div>
    //   <div className={style.containerItems}>
    //     <a href="/about">
    //       <h3>About</h3>
    //     </a>
    //     <a href="/help">
    //       <h3>Help</h3>
    //     </a>
    //     <h3>Contact</h3>
    //   </div>
    // </div>
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={4} spacing={4} justify={"center"} align={"center"}>
        {/* <Logo /> */}
        <Stack direction={"row"} spacing={6}>
          <Link href={"/"}>Inicio</Link>
          <Link href={"/about"}>Conocenos</Link>
          <Link href={"/help"}>Ayuda</Link>
          <Link href={"mailto:lookhousepf@gmail.com"} >Contactanos</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.300", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2022 Proyecto final grupal realizado en el bootcamp SoyHenry.</Text>
          <Stack direction={"row"} spacing={6}>
            <Button
              label={"GitHub"}
              href={"https://github.com/TomasTinto1234/Proyecto-Final-"}
              p={0}
            >
              <FontAwesomeIcon icon={faSquareGithub} fontSize="30px" />
            </Button>
            <Button label={"Twitter"} href={"#"} p={0}>
              <FontAwesomeIcon icon={faSquareInstagram} fontSize="30px" />
            </Button>
            <Button label={"Instagram"} href={"#"} p={0}>
              <FontAwesomeIcon icon={faSquareTwitter} fontSize="30px" />
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
