import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBarForms.module.css";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Image, useColorModeValue } from "@chakra-ui/react";

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
          <Link to="/">
            <Button>Atras</Button>
          </Link>
          {/* <Link to="/login">
            <FontAwesomeIcon icon={faCircleUser} className={style.img} />
          </Link> */}
        </div>
      </Box>
    </>
  );
}
