import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UploadImg from "../UploadImg/UploadImg";
import axios from "axios";
// import { setPublication } from "../../redux/actions";
import {
  Stack,
  Heading,
  Text,
  Textarea,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import AlertSubmit from "./AlertSubmit";
import Places from "./Places";

const CreatePost = () => {
  // const dispatch = useDispatch();
  const propertys = useSelector((state) => state.typeOfProperties);
  const cities = useSelector((state) => state.cities);
  const services = useSelector((state) => state.services);
  // const history = useHistory();
  const [infoFormProp, setInfoFormProp] = useState({
    city: "",
    address: "",
    propImg: [],
    typProp: "",
    price: "",
    age: "",
    surface: "",
    environments: "",
    bathrooms: "",
    rooms: "",
    garage: "",
    yard: "",
    pets: false,
    service: [],
  });
  console.log(infoFormProp.propImg);

  const [infoFormPub, setInfoFormPub] = useState({
    description: "",
    status: "",
    premium: false,
    report: "",
    id: null,
  });

  const [disableButtonSubmit, setDisableButtonSubmit] = useState(true);
  const [disableButtonContinue, setDisableButtonContinue] = useState(true);
  const [continueForm, setContinueForm] = useState(true);
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [propertyId /*setPropertyId*/] = useState("");

  useEffect(() => {
    const {
      city,
      address,
      surface,
      price,
      environments,
      bathrooms,
      rooms,
      garage,
      yard,
      age,
      typProp,
    } = infoFormProp;

    if (
      !city ||
      // (city === "default") ||
      !address ||
      /^[\s]+$/i.test(address) ||
      !surface ||
      !typProp ||
      // (typProp === "default") ||
      !price ||
      !environments ||
      !bathrooms ||
      !rooms ||
      !garage ||
      !yard ||
      !age /* || */
      /*!infoFormPub.description  || */
      /* (/^[\s]+$/i.test(infoFormPub.description)) */
    ) {
      setDisableButtonContinue(true);
    } else {
      setDisableButtonContinue(false);
    }
  }, [infoFormProp]);

  useEffect(() => {
    /^[\s]+$/i.test(infoFormPub.description) || !infoFormPub.description
      ? setDisableButtonSubmit(true)
      : setDisableButtonSubmit(false);
  }, [infoFormPub.description]);

  const onChangeInputProp = (e) => {
    e.preventDefault();

    setInfoFormProp({
      ...infoFormProp,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputPub = (e) => {
    e.preventDefault();

    setInfoFormPub({
      ...infoFormPub,
      [e.target.name]: e.target.value,
    });
  };

  const selectCheckBoxService = (e) => {
    if (e.target.checked === false) {
      setInfoFormProp({
        ...infoFormProp,
        service: infoFormProp.service.filter((s) => s !== e.target.value),
      });
    } else {
      setInfoFormProp({
        ...infoFormProp,
        service: [...infoFormProp.service, e.target.value],
      });
    }
  };

  const onContinueForm = () => {
    setContinueForm(false);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let user = JSON.parse(window.localStorage.getItem("User"));
      let res = await axios.post("/publication/createProperty", {
        ...infoFormProp,
      });

      let idPub = await axios.post("/publication/postProperty", {
        ...infoFormPub,
        id: res.data,
        userId: user[0].id,
      });
      window.localStorage.setItem("publicationID", idPub.data);
      console.log("en create", idPub.data);
      /*  dispatch(setPublication(idPub.data)); */
      setAlertSubmit([true, true]);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setAlertSubmit([true, false]);
      console.log(error);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <NavBarForms />
      <Box
        bg={"blackAlpha.200"}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        color={"gray.700"}
      >
        <Box bg={"#F6AD55"} borderRadius={".2rem"} w={"57.7%"} p={"1rem"} m={"1rem 0rem"}>
          <Heading
            color={"white"}
            textShadow={"gray .1rem .1rem .2rem"}
            textAlign={"center"}
            fontSize="2.5rem"
          >
            Publicar Propiedad
          </Heading>
        </Box>

        <Flex
          position="relative"
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          wrap="wrap"
          overflow="hidden"
          minWidth={"57.7%"}
        >
          {continueForm ? (
            <Box
              bg={"white"}
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"60%"}
              gap=".5rem"
              overflow="hidden"
            >
              <Box
                display={"flex"}
                flexDirection="column"
                p=".9rem"
                border="1px"
                borderColor="gray.200"
              >
                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                    Provincia
                  </Text>
                  <Select
                    color="gray.500"
                    placeholder=" "
                    borderColor="gray.200"
                    name={"city"}
                    onChange={onChangeInputProp}
                  >
                    {/* <option value="default" >Default</option> */}
                    {cities.map((type, i) => (
                      <option key={i} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                    Dirección
                  </Text>
                  {/* <Input color="gray.500"
                    autoComplete={"true"}
                    type="text"
                    name={"address"}
                    value={infoFormProp.address}
                    onChange={onChangeInputProp}
                  /> */}
                  <Places infoFormProp={infoFormProp} setInfoFormProp={setInfoFormProp} />
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                    Tipo De Inmueble
                  </Text>
                  <Select
                    color="gray.500"
                    placeholder=" "
                    name={"typProp"}
                    onChange={onChangeInputProp}
                  >
                    {/* <option value="default" >Default</option> */}
                    {propertys.map((type, i) => (
                      <option key={i} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </FormLabel>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-around"}
                flexWrap={"wrap"}
                p=".5rem"
                border="1px"
                borderColor="gray.200"
              >
                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Precio
                  </Text>
                  <NumberInput
                    color="gray.500"
                    value={infoFormProp.price}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, price: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Antigüedad
                  </Text>
                  <NumberInput
                    value={infoFormProp.age}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, age: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-around"}
                flexWrap={"wrap"}
                p=".5rem"
                border="1px"
                borderColor="gray.200"
              >
                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Superficie
                  </Text>
                  <NumberInput
                    value={infoFormProp.surface}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, surface: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Ambientes
                  </Text>
                  <NumberInput
                    value={infoFormProp.environments}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, environments: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Baños
                  </Text>
                  <NumberInput
                    value={infoFormProp.bathrooms}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, bathrooms: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="GrayText">
                    Habitaciones
                  </Text>
                  <NumberInput
                    value={infoFormProp.rooms}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, rooms: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Tamaño del garage( n° autos)
                  </Text>
                  <NumberInput
                    value={infoFormProp.garage}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, garage: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>

                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">
                    Patios
                  </Text>
                  <NumberInput
                    value={infoFormProp.yard}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInfoFormProp({ ...infoFormProp, yard: value })
                        : null
                    }
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>
              </Box>

              <Box
                display={"flex"}
                flexDirection="column"
                p=".9rem"
                gap={".7rem"}
                border="1px"
                borderColor="gray.200"
              >
                <Text fontWeight={"semiBold"} fontSize="1.15rem" color="gray.500">
                  Servicios
                </Text>
                <CheckboxGroup colorScheme="green">
                  <Stack
                    display={"flex"}
                    justifyContent={"flex-start"}
                    gap={".6rem"}
                    flexWrap={"wrap"}
                    spacing={[1, 5]}
                    direction={["column", "row"]}
                  >
                    {services.map((s, i) => (
                      <Checkbox
                        fontWeight={"semiBold"}
                        fontSize="1.15rem"
                        color="GrayText"
                        key={i}
                        name={s.name}
                        value={s.name}
                        onChange={selectCheckBoxService}
                      >
                        {s.name[0].toUpperCase() + s.name.substring(1)}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>

              <Box display={"flex"} gap={"1rem"} p=".9rem" border="1px" borderColor="gray.200">
                {/* <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox
                      name={"premium"}
                      onChange={(e) =>
                        setInfoFormPub({
                          ...infoFormPub,
                          [e.target.name]: e.target.checked === true,
                        })
                      }
                    >
                      <Text fontWeight={"semiBold"} fontSize="1.08rem" color="GrayText">Premium</Text>
                    </Checkbox>
                  </Stack>
                </CheckboxGroup> */}

                <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox
                      name={"pets"}
                      onChange={(e) =>
                        setInfoFormProp({
                          ...infoFormProp,
                          [e.target.name]: e.target.checked === true,
                        })
                      }
                    >
                      <Text fontWeight={"semiBold"} fontSize="1.08rem" color="GrayText">
                        Mascotas
                      </Text>
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Box>

              <Button
                disabled={disableButtonContinue}
                alignSelf={"flex-end"}
                colorScheme="blue"
                type="submit"
                value={"enviar"}
                onClick={onContinueForm}
              >
                Continuar
              </Button>
            </Box>
          ) : (
            <Box
              bg={"white"}
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"100%"}
              alignItems={"center"}
              gap=".5rem"
              overflow="hidden"
            >
              <Box
                display={"flex"}
                flexDirection="column"
                p=".9rem"
                w={"100%"}
                border="1px"
                borderColor="gray.200"
              >
                <FormLabel>
                  <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                    Descripcion
                  </Text>
                  <Textarea
                    name={"description"}
                    value={infoFormPub.description}
                    size="sm"
                    resize={"none"}
                    onChange={onChangeInputPub}
                  />
                </FormLabel>
              </Box>

              <Box w={"100%"}>
                <UploadImg setInfoFormProp={setInfoFormProp} infoFormProp={infoFormProp} />
              </Box>

              <Button
                disabled={disableButtonSubmit}
                alignSelf={"flex-end"}
                colorScheme="blue"
                type="submit"
                value={"enviar"}
                onClick={onSubmitForm}
              >
                Enviar
              </Button>
            </Box>
          )}
        </Flex>
        <Box
          position={"absolute"}
          display={!alertSubmit[0] ? "none" : "flex"}
          bg={"blackAlpha.100"}
          w={"full"}
          h={"full"}
        >
          <AlertSubmit alertSubmit={alertSubmit} propertyId={propertyId} />
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
