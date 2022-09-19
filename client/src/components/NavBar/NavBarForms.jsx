import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBarForms.module.css";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Image, useColorModeValue } from "@chakra-ui/react";
import { Button, Image, Flex, Box } from "@chakra-ui/react";

export default function NavBarForms() {
  return (
    <>
      <Box
        className={style.container}
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Link to="/">
          <Image src={logoImg} alt="homeLogo" />
        </Link>
        <div className={style.buttons}>
      <Flex borderBottom={".1rem solid"} borderColor={"gray.300"} justifyContent={"space-between"} p={"0rem 1rem"} alignItems={"center"} >
        <Flex >
          <Link to="/">
            <Button>Atras</Button>
            <Image h={"6rem"} src={logoImg} alt="homeLogo" />
          </Link>
          {/* <Link to="/login">
            <FontAwesomeIcon icon={faCircleUser} className={style.img} />
          </Link> */}
        </div>
      </Box>
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} pr={"2rem"} gap={"1rem"}>
          <Link to="/">
            <Button className={style.buttonAnimation}>Atras</Button>
          </Link>
          <Link to="/login">
            <Box className={style.buttonAnimation2}>
              <FontAwesomeIcon color="#3b5998" style={{ height: "2rem" }} icon={faCircleUser} />
            </Box>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
