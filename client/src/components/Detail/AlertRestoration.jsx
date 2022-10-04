import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";
import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Flex,
  useToast,
  Box,
  Textarea
} from "@chakra-ui/react";

const AlertRestoration = ({ requestRestoration, setRequestRestoration, pubId, emailUser }) => {
  const history = useHistory();
  const toast = useToast();

  const [reasons, setReasons] = useState("");

  const onSi = async (e) => {
    e.preventDefault();

    try {
      /* await emailjs.sendForm("service_4xqps7g", "template_aftwdaf", e.target, "cF426xv2uIUBSdta_") */
      history.push("/");
      toast({
        title: "Solicitud enviada correctamente.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onNo = () => {
    setRequestRestoration(false);
  };

  return (
    <Box
          position={"absolute"}
          display={!requestRestoration ? "none" : "flex"}
          bg={"blackAlpha.100"}
          top={"0px"}
          left={"0px"}
          w={"full"}
          h={"full"}
        >
    <Alert
      position={"absolute"}
      display={!requestRestoration ? "none" : "flex"}
      status={"info"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="23rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        ¿Seguro quiere solicitar que se restaure su publicación?
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Recuerda actualizar los datos de tu publicación si fue eliminada por un Admin por incumplir normas 
      </AlertDescription>
      <form style={{ padding: "1rem" }} onSubmit={onSi}>
        <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
        <Textarea
            name={"reasons_restoration"}
            value={reasons}
            size="sm"
            resize={"none"}
            w={"25rem"}
            bg={"gray.200"}
            onChange={(e) => {
              setReasons(e.target.value);
            }}
          />
          <Input
            display={"none"}
            value={`http://localhost:3000/details/${pubId}`}
            name="url_publication"
            readOnly
          />
          <Input display={"none"} value={emailUser} name="email_user" readOnly />
          <Flex gap={"1rem"}>
            <Button type="submit" mb={"10px"}>
              Si
            </Button>
            <Button onClick={onNo}>No</Button>
          </Flex>
        </Flex>
      </form>
      <AlertDescription maxWidth="sm">Recuerda elegir responsablemente.</AlertDescription>
    </Alert>
    </Box>
  );
};

export default AlertRestoration;
