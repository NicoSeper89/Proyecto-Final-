import {
  Box,
  Flex,
  Heading,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import NavBarForms from "../NavBar/NavBarForms";

export default function Admin() {
  const houses = useSelector((state) => state.houses);

  useEffect(() => {});

  return (
    <Box>
      <NavBarForms />
      <Box
        m={"20px 0px"}
        w={"100%"}
        borderRadius={"0.5rem"}
        p={".3rem 0rem"}
        textAlign={"start"}
        bg={"rgba(216, 158, 26, 0.35)"}
      >
        <Heading>Bienvenido Administrador (aca va el nombre del usuario)</Heading>
      </Box>
      <Box>
        <Text>Acá se va a ver la lista de los usuarios</Text>
      </Box>
      <br />
      <Box m={"30px"}>
        {/* <Text>Tablas Administradoras</Text> */}
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          w={"100%"}
          h={"100%"}
          boxShadow="dark-lg"
          p="10px"
          border="1px solid grey.600"
          // bg={"rgba(216, 158, 26, 0.35)"}
          borderRadius={"0.5rem"}
        >
          <TabList>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Usuarios Registrados
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones Reportadas
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones eliminadas
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Usuarios Reportados?
            </Tab>
          </TabList>
          <TabPanels display={"flex"} justifyContent="center" flexDirection={"column"}>
            <TabPanel>
              <Box>Todos los usuarios registrados</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Th>Fecha de creación</Th>
                      <Th>Usuario</Th>
                      <Th>Ranking</Th>
                      <Th>Ver Publicaciones</Th>
                      <Th>Ver Reportes</Th>
                    </Thead>
                    <Tbody>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Box>Todas las publicaciones</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Th>Fecha de creación</Th>
                      <Th>Publicación</Th>
                      <Th>Ver Propiedad</Th>
                      <Th>Ver perfil de Propietario</Th>
                    </Thead>
                    <Tbody>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Box>Publicaciones para Aprobar</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Th>Fecha de creación</Th>
                      <Th>Publicación</Th>
                      <Th>Ver Propiedad</Th>
                      <Th>Ver perfil de Propietario</Th>
                    </Thead>
                    <Tbody>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Box>Todas las publicaciones reportadas</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
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
                      <Tr></Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Box>Todas las publicaciones eliminadas</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Th>Fecha de creación</Th>
                      <Th>Fecha de eliminación?</Th>
                      <Th>Motivo de eliminación</Th>
                      <Th>Ver Propiedad</Th>
                    </Thead>
                    <Tbody>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                      <Tr></Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Footer />
    </Box>
  );
}
