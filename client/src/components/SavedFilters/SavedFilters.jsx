import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  saveFilter,
  getPublications,
  setCurrentPage,
  saveSort,
  clearFilters,
} from "../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function SavedFilters({ filterToSave, savedSort, savedCity }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [savedValue, setSavedValue] = useState([]);
  const [storedValues, setStoredValues] = useState([]);

  useEffect(() => {
    setStoredValues(Object.keys(localStorage).filter((k) => k !== "User" && k !== "publicationID"));
  }, [savedValue]);

  const handleLocalStorage = (keyValue) => {
    if (keyValue) {
      window.localStorage.setItem(keyValue, JSON.stringify([filterToSave, savedSort, savedCity]));
      setSavedValue([...savedValue, keyValue]);
      setValue("");
    }
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleValue = (event) => {
    if (!event.target.value) {
      dispatch(clearFilters());
      dispatch(getPublications(filterToSave, savedSort, savedCity));
      setCurrentPage(1);
    }
    
    if(event.target.value){
      let filter = localStorage.getItem(event.target.value);
      let newFilter = JSON.parse(filter);
      dispatch(saveFilter(newFilter[0]));
      dispatch(saveSort(newFilter[1]));
      dispatch(setCurrentPage(1));
      dispatch(getPublications(filterToSave, savedSort, newFilter[2]));
    }
    else{
      dispatch(clearFilters())
    }
  };

  return (
    <Flex direction={"row"}>
      <Stack cursor={"pointer"} width={"8rem"} marginRight={"10px"}>
        <InputGroup borderColor={"black"}>
          <Input
            transition="all 0.2s"
            borderColor={"black"}
            _hover={{ bg: "#D9D9D9" }}
            _expanded={{ bg: "white" }}
            _focus={{ bg: "#D9D9D9" }}
            placeholder="Filtro"
            color={"black"}
            type="text"
            value={value}
            onChange={handleChange}
          />
          <InputRightElement
            onClick={() => handleLocalStorage(value)}
            children={<FontAwesomeIcon icon={faBookmark} color="gray.300" />}
            cursor={"pointer"}
          />
        </InputGroup>
        {/* <Button marginRight={"10px"} onClick={() => handleLocalStorage(value)}>
          Guardar Filtros
        </Button> */}
      </Stack>
      <Box width={"8rem"}>
        <Menu
          cursor={"pointer"}
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
            _hover={{ bg: "#D9D9D9" }}
            _focus={{ bg: "#D9D9D9" }}
            onChange={handleValue}
            placeholder="Mis Filtros"
          >
            {storedValues?.map((v, i) => (
              <option key={i}>{v}</option>
            ))}
          </Select>
        </Menu>
      </Box>
    </Flex>
  );
}
export default SavedFilters;
