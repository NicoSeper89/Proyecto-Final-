import {
  Avatar,
  Box,
  Button,
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
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAll,
  getForApproval,
  getInfoUser,
  getPubliNoAvail,
  getReports,
  getUserInfo,
  getTotalUsers,
  viewUser2,
  getUserImage,
  deleteReport,
} from "../../redux/actions";
import Footer from "../Footer/Footer";
import NavBarForms from "../NavBar/NavBarForms";
import BarChart from "../BarChart/Barchart.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Admin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses);
  const myUser = useSelector((state) => state.infoUser);
  const imageUser = useSelector((state) => state.imageUser);
  const forApproval = useSelector((state) => state.forApproval);
  const reports = useSelector((state) => state.reports);
  const housesEliminadas = useSelector((state) => state.housesEliminadas);
  const totalUsers = useSelector((state) => state.totalUsers);
  const infoUser = JSON.parse(window.localStorage.getItem("User"));

  useEffect(() => {
    dispatch(getAll());
    dispatch(getForApproval());
    dispatch(getReports());
    dispatch(getPubliNoAvail());
    dispatch(getTotalUsers);
    dispatch(getUserImage(infoUser[0].id));
    if (!infoUser) {
      const user = JSON.parse(window.localStorage.getItem("User"));
      dispatch(getInfoUser(user));
      dispatch(getUserInfo(infoUser[0].id));
    }
  }, [dispatch]);

  const viewUser = (id) => {
    const userAdmin = totalUsers.filter((e) => e.id === id);
    window.localStorage.setItem("ViewUser", JSON.stringify(userAdmin));

    // window.localStorage.setItem("adminId", `${p.id}`)
    history.push(`/viewUser`);
  };
  const delReport = (id) => {
    dispatch(deleteReport(id));
    // window.localStorage.setItem("adminId", `${p.id}`)
    window.location.reload();
  };

  let sessionDates = JSON.parse(sessionStorage.getItem("dates"));
  const dates = sessionDates[0];
  const userDates = sessionDates[1];

  function amount(array, value) {
    var n = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        n++;
      }
    }
    return n;
  }

  let labels = [...new Set(dates)];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Cantidad de Publicaciones por mes",
        data: labels.map((a) => amount(dates, a)),
        backgroundColor: ["rgba(216, 158, 26, 0.65)"],
      },
    ],
  });

  let userLabels = [...new Set(userDates)];
  const [userData, setUserData] = useState({
    labels: userLabels,
    datasets: [
      {
        label: "Cantidad de Usuarios por mes",
        data: userLabels.map((a) => amount(userDates, a)),
        backgroundColor: ["rgba(216, 158, 26, 0.65)"],
      },
    ],
  });

  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBarForms />
      <Flex
        direction={"row"}
        m={"40px 0px"}
        w={"100%"}
        p={".3rem 1rem"}
        textAlign={"start"}
        bg={"rgba(216, 158, 26, 0.35)"}
      >
        <Avatar src={imageUser} alt={"Avatar Alt"} />
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
              Publicaciones eliminadas
            </Tab>
            <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
              Reportes
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>Todos los usuarios registrados</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Tr>
                        <Th>Fecha de creación</Th>
                        <Th>Usuario</Th>
                        <Th>Rating</Th>
                        <Th>Estado</Th>
                        <Th>Perfil</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {totalUsers?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.name}</Td>
                            <Td>{p.rating}</Td>
                            <Td>{p.banned ? "Baneado" : "Activo"}</Td>
                            <Td>
                              <Button h="1.75rem" size="sm" onClick={() => viewUser(p.id)}>
                                <FontAwesomeIcon icon={faUser} />
                              </Button>
                              {/* <Link to={`/perfilPropietario/${p.userId}`}>Ir a perfil</Link> */}
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
                      <Th>Estado</Th>
                      <Th>Propiedad</Th>
                      <Th>Perfil de Propietario</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {houses?.map((p, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{p.createdAt}</Td>
                          <Td>{p.property.address}</Td>
                          <Td>{p.status}</Td>
                          <Td>
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => history.push(`/details/${p.id}`)}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </Td>
                          <Td>
                            <Button h="1.75rem" size="sm" onClick={() => viewUser(p.userId)}>
                              <FontAwesomeIcon icon={faUser} />
                            </Button>
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
                      <Tr>
                        <Th>Fecha de creación</Th>
                        <Th>Publicación</Th>
                        <Th>Propiedad</Th>
                        <Th>Perfil de Propietario</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {forApproval?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.property.address}</Td>
                            <Td>
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => history.push(`/details/${p.id}`)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </Td>
                            <Td>
                              <Button h="1.75rem" size="sm" onClick={() => viewUser(p.userId)}>
                                <FontAwesomeIcon icon={faUser} />
                              </Button>
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
                      <Tr>
                        <Th>Fecha de creación</Th>
                        <Th>Fecha de eliminación</Th>
                        <Th>Motivo?</Th>
                        <Th>Propiedad</Th>
                        <Th>Perfil del propietario</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {housesEliminadas?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.updatedAt}</Td>
                            <Td>Motivo??</Td>
                            <Td>
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => history.push(`/details/${p.id}`)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </Td>
                            <Td>
                              <Button h="1.75rem" size="sm" onClick={() => viewUser(p.userId)}>
                                <FontAwesomeIcon icon={faUser} />
                              </Button>
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
              <Box>Todos los reportes realizados a las publicaciones.</Box>
              <Flex>
                <TableContainer w={"100%"}>
                  <Table variant="striped" colorScheme="teal" w={"100%"}>
                    <Thead w={"100%"}>
                      <Tr>
                        <Th>Fecha de creación</Th>
                        <Th>Tipo de Reporte</Th>
                        <Th>Descripción</Th>
                        <Th>Propiedad</Th>
                        <Th>Usuario que reportó</Th>
                        <Th>Borrar reporte</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {reports?.map((p, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{p.createdAt}</Td>
                            <Td>{p.type}</Td>
                            <Td
                              padding="20px"
                              maxWidth="100px"
                              overflowY="hidden"
                              overflowX="scroll"
                            >
                              {p.info}
                            </Td>
                            <Td>
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => history.push(`/details/${p.publications[0].id}`)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </Td>
                            <Td>
                              <Button h="1.75rem" size="sm" onClick={() => viewUser(p.userId)}>
                                <FontAwesomeIcon icon={faUser} />
                              </Button>
                            </Td>
                            <Td>
                              <Button h="1.75rem" size="sm" onClick={() => delReport(p.id)}>
                                <FontAwesomeIcon icon={faUser} />
                              </Button>
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
          h={"350px"}
          boxShadow="dark-lg"
          p="10px"
          border="1px solid grey.600"
          // bg={"rgba(216, 158, 26, 0.35)"}
          borderRadius={"0.5rem"}
          textAlign={"center"}
        >
          <Text fontSize="xl">Cantidad de Publicaciones realizadas en el último mes</Text>
          <br />
          <BarChart chartData={data} />
        </Box>
        <Box
          w={"500px"}
          h={"350px"}
          boxShadow="dark-lg"
          p="10px"
          border="1px solid grey.600"
          // bg={"rgba(216, 158, 26, 0.35)"}
          borderRadius={"0.5rem"}
          textAlign={"center"}
        >
          <Text fontSize="xl">Cantidad de Registros realizados en el último mes</Text>
          <br />
          <BarChart chartData={userData} />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}
