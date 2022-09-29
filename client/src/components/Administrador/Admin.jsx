import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getForApproval,
  getInfoUser,
  getPubliNoAvail,
  getReports,
  getUserInfo,
} from "../../redux/actions";
import Footer from "../Footer/Footer";
import NavBarForms from "../NavBar/NavBarForms";

export default function Admin() {
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses);
  const myUser = useSelector((state) => state.infoUser);
  const forApproval = useSelector((state) => state.forApproval);
  const reports = useSelector((state) => state.reports);
  const housesEliminadas = useSelector((state) => state.housesEliminadas);
  const totalUsers = useSelector((state) => state.totalUsers);

  console.log("HOUSEE: ", houses);
  console.log("USEER: ", myUser);
  console.log("APROBAR: ", forApproval);
  console.log("REPORTS: ", reports);
  console.log("ELIMINADAS: ", housesEliminadas);
  console.log("USUARIOSS: ", totalUsers);

  const infoUser = JSON.parse(window.localStorage.getItem("User"));
  useEffect(() => {
    dispatch(getAll());
    dispatch(getForApproval());
    dispatch(getReports());
    dispatch(getPubliNoAvail());
    if (!infoUser) {
      const user = JSON.parse(window.localStorage.getItem("User"));
      dispatch(getInfoUser(user));
      dispatch(getUserInfo(infoUser[0].id));
    }
  }, [dispatch]);

  return (
    <Box>
      <NavBarForms />
      <Flex
        direction={"row"}
        m={"40px 0px"}
        w={"100%"}
        p={".3rem 1rem"}
        textAlign={"start"}
        bg={"rgba(216, 158, 26, 0.35)"}
      >
        <Avatar />
        <Heading ml={"1rem"}>Bienvenido Administrador {infoUser[0].name}!</Heading>
      </Flex>
      <Box
        w={"100%"}
        p={".3rem .5rem"}
        textAlign={"start"}
        borderBottom={"1px solid #C3C3C3"}
        m={"30px 3rem"}
      >
        <Text ml={"1rem"} as={"b"} fontSize="2xl">
          INFORMACIÓN
        </Text>
      </Box>

      <Box m={"0px 30px"}>
        {/* <Text>Tablas Administradoras</Text> */}
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          w={"100%"}
          h={"500px"}
          boxShadow="dark-lg"
          p="10px"
          border="1px solid grey.600"
          // bg={"rgba(216, 158, 26, 0.35)"}
          borderRadius={"0.5rem"}
          overflow={"scroll"}
        >
          <TabList>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Usuarios Registrados
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones para Aprobar
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones Reportadas
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Publicaciones eliminadas
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>Todos los usuarios registrados</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Th>Fecha de creación</Th>
                      <Th>Usuario</Th>
                      <Th>Rating</Th>
                      <Th>Perfil</Th>
                    </Thead>
                    <Tbody>
                      {totalUsers[0]?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.name}</Td>
                            <Td>{p.rating}</Td>
                            <Td>
                              <Link to={`/perfilPropietario/${p.userId}`}>Ir a perfil</Link>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>

            <TabPanel w={"100%"} h={"100%"}>
              <Box>Todas las publicaciones</Box>
              <TableContainer w={"100%"}>
                <Table variant="striped" colorScheme="teal" w={"100%"}>
                  <Thead w={"100%"}>
                    <Tr>
                      <Th>Fecha de creación</Th>
                      <Th>Publicación</Th>
                      <Th>Ver Propiedad</Th>
                      <Th>Ver perfil de Propietario</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {houses?.map((p, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{p.createdAt}</Td>
                          <Td>{p.property.address}</Td>
                          <Td>
                            <Link to={`/details/${p.id}`}>Ir a propiedad</Link>
                          </Td>
                          <Td>
                            <Link to={p.userId}>Ir a perfil</Link>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
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
                      {forApproval?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.property.address}</Td>
                            <Td>
                              <Link to={`/details/${p.id}`}>Ir a propiedad</Link>
                            </Td>
                            <Td>
                              <Link to={p.userId}>Ir a perfil</Link>
                            </Td>
                          </Tr>
                        );
                      })}
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
                      {reports?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.type}</Td>
                            <Td>{p.info}</Td>
                            <Td>
                              <Link to={`/details/${p.publications[0].id}`}>Ir a propiedad</Link>
                            </Td>
                            <Td>
                              <Link to={p.userId}>Ir a perfil</Link>
                            </Td>
                          </Tr>
                        );
                      })}
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
                      {housesEliminadas?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>fecha?</Td>
                            <Td>motivo?</Td>
                            <Td>
                              <Link to={`/details/${p.id}`}>Ir a propiedad</Link>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <br />
      <Box
        w={"100%"}
        p={".3rem .5rem"}
        textAlign={"start"}
        borderBottom={"1px solid #C3C3C3"}
        m={"30px 3rem"}
      >
        <Text ml={"1rem"} as={"b"} fontSize="2xl">
          ESTADISTICAS
        </Text>
      </Box>
      <Flex direction={"row"} justifyContent={"space-evenly"} m={"30px"}>
        <Box
          w={"500px"}
          h={"400px"}
          boxShadow="dark-lg"
          p="10px"
          border="1px solid grey.600"
          bg={"rgba(216, 158, 26, 0.35)"}
          borderRadius={"0.5rem"}
        >
          ACA PUEDE IR UNA GRAFICA = De cantidad de publicaciones realizadas el ultimo trimestre o
          algo asi
        </Box>
        <Box
          w={"500px"}
          h={"400px"}
          boxShadow="dark-lg"
          p="10px"
          border="1px solid grey.600"
          bg={"rgba(216, 158, 26, 0.35)"}
          borderRadius={"0.5rem"}
        >
          ACA PUEDE IR OTRA GRAFICA = De cantidad de usuarios registrados realizadas el ultimo
          trimestre o algo asi
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}
