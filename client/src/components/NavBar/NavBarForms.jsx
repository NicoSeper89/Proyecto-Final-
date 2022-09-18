import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBarForms.module.css";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Image, Flex, Box } from "@chakra-ui/react";

export default function NavBarForms() {
  return (
    <>
      <Flex borderBottom={".1rem solid"} borderColor={"gray.300"} justifyContent={"space-between"} p={"0rem 1rem"} alignItems={"center"} >
        <Flex >
          <Link to="/">
            <Image h={"6rem"} src={logoImg} alt="homeLogo" />
          </Link>
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
