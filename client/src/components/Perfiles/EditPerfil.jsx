import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import Rating from "./Rating";
import { imgUserUpload } from "../../redux/actions";

export default function EditPerfil() {
  return (
    <Box>
      <NavBarForms />
      <Box></Box>
    </Box>
  );
}
