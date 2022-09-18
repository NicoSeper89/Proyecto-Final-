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
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";
import { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
    dispatch(valueFilter(e.target.name));
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
    dispatch(valueFilter(e.target.name));
  };

  //SORT PLATA
  const orderByPrice = (e) => {
    var orden;

    if (e.target.value === "Precio") orden = { name: "default", direccion: "minMax" };
    else orden = { name: "price", direccion: e.target.value };
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, orden, city));
    dispatch(valueFilter(e.target.name));
  };

  //RESET FILTROS
  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(getPublications(filters, sorting, city));
    dispatch(setCurrentPage(1));
    /* esto del paginado sirve para que vuelva a la pagina 1 cuando se ejecuta el evento. Mel*/
  }

  return (
    <Box className={sty.continer}>
      <NumberInput width="80px" defaultValue={""} min={1} max={20} onChange={selectAmbients}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Box>
        <Menu name="property" value={"property"} className={sty.select} onChange={selectPropType}>
          {/* volví a agregar el handle selectPropType, se ve que se borró sin querer y no andaba ese filtro. Mel */}
          <MenuButton
            px={7}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            Propiedad
          </MenuButton>
          <MenuList>
            {propertys.map((e) => {
              return (
                <MenuItem key={e.id} value={e.name}>
                  {e.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Box>

      <Box>
        <Menu id="4" name={"pets"} value={"pets"} className={sty.select} onChange={selectPets}>
          <MenuButton
            px={7}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
            value="Mascotas"
          >
            Mascotas
          </MenuButton>
          <MenuList>
            <MenuItem value={true}>si</MenuItem>
            <MenuItem value={false}>no</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Menu id="3" name={"price"} value={"price"} className={sty.select} onChange={orderByPrice}>
          <MenuButton
            px={7}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
            value="Precio"
          >
            Precio
          </MenuButton>
          <MenuList>
            <MenuItem value="maxMin">Mayor Precio</MenuItem>
            <MenuItem value="minMax">Menor Precio</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <FontAwesomeIcon
        icon={faFilterCircleXmark}
        onClick={(e) => handleResetFilter(e)}
        className={style.img}
      />
      <Box>
        <input
          type="text"
          className={sty.Serch}
          placeholder="Buscar Ciudad..."
          onChange={changes}
          value={city}
        />
        {/* agregué este value. Mel */}
        <Button colorScheme="teal" variant="link" onClick={search_House}>
          Buscar
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
