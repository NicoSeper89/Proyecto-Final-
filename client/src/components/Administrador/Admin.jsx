import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Footer from "../Footer/Footer";
import NavBarForms from "../NavBar/NavBarForms";

export default function Admin() {
  return (
    <Box>
      <NavBarForms />
      <Text>Soy Admin</Text>
      <Box>
        <Text>Acá se va a ver la lista de los usuarios</Text>
      </Box>
      <Box>
        <Text>Acá va la tabla de las publicaciones reportadas</Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Th>Fecha de creación</Th>
              <Th>Tipo de Reporte</Th>
              <Th>Descripción</Th>
              <Th>Ver Propiedad</Th>
              <Th>Ver Usuario que reportó</Th>
            </Thead>
            <Tbody>
              <Tr></Tr>
              <Tr></Tr>
              <Tr></Tr>
              <Tr></Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Box>
  );
}
