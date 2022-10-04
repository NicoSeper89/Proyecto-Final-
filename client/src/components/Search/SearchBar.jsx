import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
import SavedFilters from "../SavedFilters/SavedFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  getPublications,
  clearFilters,
  updateFilterProp,
  updateFilterAmbient,
  updateFilterPets,
  setCurrentPage,
  valueFilter,
  updateFilterGarage,
  updateSorting,
} from "../../redux/actions";
import { faFilterCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Menu,
  Stack,
  InputGroup,
  InputRightElement,
  Input,
  Select,
  Button,
  Flex,
  useToast,
  useDisclosure,
  ScaleFade,
  Fade,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

// import { searcHouse } from "../../redux/actions";
// import { filter } from "../../redux/actions";
// import { precio } from "../../redux/actions";

// http://publication/propertyTypes   ruta para traer los tipos de propiedades ya esta lista
// pasar ciudad para que la pueda encontrar esta nos llega desde el input
// para el sort by podemos ordenar por orden alfabetico

// const ambientes = [1, 2, 3, 4, "5+"];

const SearchBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const propertys = useSelector((state) => state.typeOfProperties);
  const [city, setCity] = useState("");
  const [clean, setClean] = useState(false);
  // const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [buttonResponse, setButtonResponse] = useState(false);
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    return () => dispatch(clearFilters());
  }, [clean]);

  //BUSCADOR
  const changes = (e) => {
    setCity(e.target.value);
  };
  const search_House = () => {
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
    setCity("");

    // toast({
    //   title: "Busqueda inexistente.",
    //   status: "error",
    //   isClosable: true,
    // });
  };

  //SELECT PROPIEDADES
  const selectPropType = (e) => {
    dispatch(updateFilterProp(e.target.value));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };

  //SELECT AMBIENTES
  const selectAmbients = (e) => {
    dispatch(updateFilterAmbient(e));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };
  //SELECT GARAGE
  const selectGarageSize = (e) => {
    dispatch(updateFilterGarage(e));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };

  //SELECT MASCOTAS
  const selectPets = (e) => {
    dispatch(updateFilterPets(e.target.value));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };

  //SORT PLATA
  const orderByPrice = (e) => {
    let orden;
    let values = e.target.value.split("/");
    if (values[0] === "Ordenar por") orden = { name: "default", direccion: "minMax" };
    else orden = { name: values[0], direccion: values[1] };
    dispatch(updateSorting(orden));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };

  //RESET FILTROS
  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(getPublications(filters, sorting, city));
    dispatch(setCurrentPage(1));
    setCity("");
    setClean(true);
    setTimeout(() => {
      setClean(false);
    }, 1);
  }

  return (
    <Box className={sty.continer} marginX={"10%"}>
      <Box marginRight={"10px"}>
        <FontAwesomeIcon
          icon={faFilterCircleXmark}
          onClick={(e) => handleResetFilter(e)}
          className={style.img}
        />
      </Box>
      <Box marginRight={"10px"}>
        <Stack>
          <InputGroup borderColor={"black"}>
            <InputRightElement
              onClick={search_House}
              children={<FontAwesomeIcon icon={faMagnifyingGlass} color="gray.300" />}
              cursor={"pointer"}
            />
            <Input
              transition="all 0.2s"
              borderColor={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _expanded={{ bg: "white" }}
              _focus={{ bg: "#D9D9D9" }}
              type="text"

              placeholder="Buscar por ubicación..."

              color={"black"}
              onChange={changes}
              value={city}
            />
          </InputGroup>
          {/* <Button colorScheme="teal" variant="link" onClick={search_House}>
            Buscar
          </Button> */}
        </Stack>
      </Box>
      <Box>
        <SavedFilters filterToSave={filters} savedSort={sorting} savedCity={city} clean={clean} />
      </Box>

      <Button
        mr={"10px"}
        cursor={"pointer"}
        bg="#bebcbc"
        color="black"
        border={"1px solid"}
        borderColor={"black"}
        _hover={{ bg: "#5e5d5d", color: "white" }}
        _focus={{ bg: "#5e5d5d", color: "white" }}
        transition="all 2s ease-in-out"
        onClick={onToggle}
      >
        Filtros
      </Button>

      <Fade initialScale={0.9} in={isOpen}>
        <Flex direction={"row"} rounded="md">
          {/* {buttonResponse ? ( */}
          <Flex direction={"row"}>
            {!clean && (
              <NumberInput
                marginRight={"10px"}
                transition="all 0.2s"
                borderColor={"black"}
                width="80px"
                defaultValue={""}
                min={1}
                max={20}
                onChange={selectAmbients}
              >
                <NumberInputField
                  _hover={{ bg: "#D9D9D9" }}
                  _expanded={{ bg: "white" }}
                  _focus={{ bg: "#D9D9D9" }}
                  placeholder="Amb"
                />
                <NumberInputStepper borderColor={"black"}>
                  <NumberIncrementStepper borderColor={"black"} />
                  <NumberDecrementStepper borderColor={"black"} />
                </NumberInputStepper>
              </NumberInput>
            )}
            {!clean && (
              <NumberInput
                marginRight={"10px"}
                transition="all 0.2s"
                borderColor={"black"}
                width="80px"
                defaultValue={""}
                min={1}
                max={20}
                onChange={selectGarageSize}
              >
                <NumberInputField
                  _hover={{ bg: "#D9D9D9" }}
                  _expanded={{ bg: "white" }}
                  _focus={{ bg: "#D9D9D9" }}
                  placeholder="Garage"
                />
                <NumberInputStepper borderColor={"black"}>
                  <NumberIncrementStepper borderColor={"black"} />
                  <NumberDecrementStepper borderColor={"black"} />
                </NumberInputStepper>
              </NumberInput>
            )}
            <Box marginRight={"10px"}>
              <Menu
                px={"1rem"}
                py={".5rem"}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                variant="link"
                _hover={{ bg: "white" }}
                _expanded={{ bg: "white" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Select
                  borderColor={"black"}
                  name="property"
                  onChange={selectPropType}
                  _hover={{ bg: "#D9D9D9" }}
                  _focus={{ bg: "#D9D9D9" }}
                >
                  <option value={"Propiedad"} selected={clean}>
                    Propiedad
                  </option>
                  {propertys.map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </Select>
              </Menu>
            </Box>

            <Box marginRight={"10px"}>
              <Menu
                id="4"
                px={"1rem"}
                py={".5rem"}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                variant="link"
                _hover={{ bg: "white" }}
                _expanded={{ bg: "white" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Select
                  borderColor={"black"}
                  onChange={selectPets}
                  name={"pets"}
                  _hover={{ bg: "#D9D9D9" }}
                  _focus={{ bg: "#D9D9D9" }}
                >
                  <option value={"Mascotas"} selected={clean}>
                    Mascotas
                  </option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </Select>
              </Menu>
            </Box>
            <Box marginRight={"10px"}>
              <Menu
                id="3"
                px={"1rem"}
                py={".5rem"}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                variant="link"
                _hover={{ bg: "white" }}
                _expanded={{ bg: "white" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Select
                  name={"price"}
                  onChange={orderByPrice}
                  borderColor={"black"}
                  _hover={{ bg: "#D9D9D9" }}
                  _focus={{ bg: "#D9D9D9" }}
                >
                  <option value="Ordenar por/nada" selected={clean}>
                    Ordenar Por
                  </option>
                  <option value="price/maxMin">Mayor Precio</option>
                  <option value="price/minMax">Menor Precio</option>
                  <option value="age/minMax">Mas Nuevo</option>
                  <option value="age/maxMin">Mas Viejo</option>
                  <option value="surface/maxMin">Mayor superficie</option>
                  <option value="surface/minMax">Menos superficie</option>
                </Select>
              </Menu>
            </Box>
          </Flex>
          {/* // ) : null} */}
        </Flex>
      </Fade>
    </Box>
  );
};

export default SearchBar;
