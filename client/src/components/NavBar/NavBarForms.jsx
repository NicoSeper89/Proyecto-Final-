import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBarForms.module.css";
import logoImg from "../../Image/Logo LookHouse.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Flex, Image, useColorModeValue } from "@chakra-ui/react";

export default function NavBarForms() {
  return (
    <>
      <Box
        className={style.container}
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          p={"0rem 0.2rem"}
          w={"100%"}
          h={"60px"}
        >
          <Link to="/">
            <Image src={logoImg} alt="homeLogo" h={"140px"} marginTop={"20px"} />
          </Link>
          <Box>
            <Link to="/">
              <Button
                transition="all 0.2s"
                borderColor={"#BEBCBC"}
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "#D9D9D9" }}
                _expanded={{ bg: "white" }}
                _focus={{ bg: "#D9D9D9" }}
                color={"black"}
              >
                Atras
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
