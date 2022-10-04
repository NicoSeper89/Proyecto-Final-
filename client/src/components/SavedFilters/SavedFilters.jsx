import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveFilter,
  getPublications,
  setCurrentPage,
  saveSort,
  clearFilters,
  getUserInfo,
  setCity
} from "../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function SavedFilters({ filterToSave, savedSort, savedCity, clean }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUserInfo);
  const [value, setValue] = useState("");
  const [savedValue, setSavedValue] = useState([]);
  const [storedValues, setStoredValues] = useState([]);

  useEffect(() => {
    const loginUser = JSON.parse(window.localStorage.getItem("User"));
    if (loginUser) {
      dispatch(getUserInfo(loginUser[0].id));
      setTimeout(() => {
        setStoredValues(Object.keys(localStorage).filter((k) => k.includes(loginUser[1].mail)));
      }, 100);
    }
  }, [dispatch, savedValue]);

  const handleLocalStorage = (keyValue) => {
    if (user.length === 0) {
      alert("Debe inciar session para poder guardar un filtro de busqueda!!!");
      setValue("");
    } else if (keyValue) {
      window.localStorage.setItem(
        keyValue + " " + user.loginInfo.mail,
        JSON.stringify([filterToSave, savedSort, savedCity])
      );
      setSavedValue([...savedValue, keyValue]);
      setValue("");
    }
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleValue = (event) => {
    if (event.target.value === "") {
      dispatch(clearFilters());
      dispatch(getPublications(filterToSave, savedSort, savedCity));
      setCurrentPage(1);
    } else if (event.target.value) {
      let filter = localStorage.getItem(event.target.value + " " + user.loginInfo.mail);
      let newFilter = JSON.parse(filter);
      dispatch(saveFilter(newFilter[0]));
      dispatch(saveSort(newFilter[1]));
      dispatch(setCity(newFilter[2]))
      dispatch(getPublications(filterToSave, savedSort, newFilter[2]));
      dispatch(setCurrentPage(1));
      console.log(newFilter[2]);
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
          >
            <option value={""} selected={clean}>Mis Filtros</option>
            {storedValues?.map((v, i) => (
              <option key={i}>{v.split(" ")[0]}</option>
            ))}
          </Select>
        </Menu>
      </Box>
    </Flex>
  );
}
export default SavedFilters;
