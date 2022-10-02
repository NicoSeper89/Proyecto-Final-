import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  useToast,
  Box
} from "@chakra-ui/react";
import { deletePublicaction } from "../../redux/actions";

const AlertDelete = ({ alertSubmit, setAlertSubmit, id, deleted }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const onSi = (e) => {
    console.log("no admin")
    console.log(e)
    dispatch(deletePublicaction(id));
    history.push("/");
    toast({
      title: "Publicación eliminada correctamente.",
      status: "success",
      isClosable: true,
    });
  };
  const onNo = () => {
    setAlertSubmit([false,false])
  };

  return (
    <Box
          position={"absolute"}
          display={!alertSubmit[0] ? "none" : "flex"}
          bg={"blackAlpha.100"}
          top={"0px"}
          left={"0px"}
          w={"full"}
          h={"full"}
        >
    <Alert
      position={"absolute"}
      status={!alertSubmit[1] ? "error" : "info"}
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
        {deleted
          ? " ¿Estás seguro de que queres restaurar la publicación?"
          : " ¿Estás seguro de que queres eliminar la publicación?"}
        {/* {!alertSubmit[1]
          ? "La publicación no se pudo borrar, lo sentimos mucho!"
          : "La publicación se borro correctamente"} */}
      </AlertTitle>
      <Flex gap={"1rem"}>
        <Button mb={"10px"} onClick={(e) => onSi(e)}>
          Si
        </Button>
        <Button onClick={(e) => onNo(e)}>No</Button>
      </Flex>
      <br />
      <AlertDescription maxWidth="sm">Muchas gracias por utilizar nuestra web!</AlertDescription>
    </Alert>
    </Box>
  );
};

export default AlertDelete;
