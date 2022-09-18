import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
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
} from "../../redux/actions";
import { faFilterCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";
import { useState } from "react";
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
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

// import { searcHouse } from "../../redux/actions";
// import { filter } from "../../redux/actions";
// import { precio } from "../../redux/actions";

// http://localhost:3001/publication/propertyTypes   ruta para traer los tipos de propiedades ya esta lista
// pasar ciudad para que la pueda encontrar esta nos llega desde el input
// para el sort by podemos ordenar por orden alfabetico

// const ambientes = [1, 2, 3, 4, "5+"];

const SearchBar = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const propertys = useSelector((state) => state.typeOfProperties);
  const [city, setCity] = useState("");

  //BUSCADOR
  const changes = (e) => {
    setCity(e.target.value);
  };

  const search_House = () => {
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
    setCity(""); /* esto es para que se setee el estado del input */
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

  //SELECT MASCOTAS
  const selectPets = (e) => {
    dispatch(updateFilterPets(e.target.value));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };

  //SORT PLATA
  const orderByPrice = (e) => {
    var orden;

    if (e.target.value === "Precio") orden = { name: "default", direccion: "minMax" };
    else orden = { name: "price", direccion: e.target.value };
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, orden, city));
  };

  //RESET FILTROS
  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(getPublications(filters, sorting, city));
    dispatch(setCurrentPage(1));
  }

  return (
    <Box className={sty.continer}>
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
              _hover={{ bg: "white" }}
              _expanded={{ bg: "white" }}
              _focus={{ bg: "white" }}
              type="text"
              placeholder="Buscar Ciudad..."
              color={"black"}
              onChange={changes}
              value={city}
            />
          </InputGroup>
          {/* agregué este value. Mel */}
          {/* <Button colorScheme="teal" variant="link" onClick={search_House}>
            Buscar
          </Button> */}
        </Stack>
      </Box>
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
          _hover={{ bg: "white" }}
          _expanded={{ bg: "white" }}
          _focus={{ bg: "white" }}
        />
        <NumberInputStepper borderColor={"black"}>
          <NumberIncrementStepper borderColor={"black"} />
          <NumberDecrementStepper borderColor={"black"} />
        </NumberInputStepper>
      </NumberInput>
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
            _hover={{ bg: "white" }}
            _focus={{ bg: "white" }}
          >
            <option value={"Propiedad"}>Propiedad</option>
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
            _hover={{ bg: "white" }}
            _focus={{ bg: "white" }}
          >
            <option value={"Mascotas"}>Mascotas</option>
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
            _hover={{ bg: "white" }}
            _focus={{ bg: "white" }}
          >
            <option value="Precio">Precio</option>
            <option value="maxMin">Mayor Precio</option>
            <option value="minMax">Menor Precio</option>
          </Select>
        </Menu>
      </Box>
    </Box>
  );
};

export default SearchBar;
