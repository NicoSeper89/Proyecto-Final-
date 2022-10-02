import React from "react";
import { useHistory } from "react-router-dom";
/* import emailjs from "emailjs-com"; */
import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";

const AlertRestoration = ({ requestRestoration, setRequestRestoration, pubId, emailUser }) => {
  const history = useHistory();
  const toast = useToast();

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
    <Alert
      position={"absolute"}
      display={!requestRestoration ? "none" : "flex"}
      status={"warning"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        ¿Seguro quiere solicitar que se restaure su publicación?
      </AlertTitle>
      <form style={{ padding: "1rem" }} onSubmit={onSi}>
        <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
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
  );
};

export default AlertRestoration;
