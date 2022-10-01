import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from "@chakra-ui/react";
import { deletePublicaction } from "../../redux/actions";

const AlertAdminDelete = ({ alertSubmit, pubId, deleted }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSi = () => {
    dispatch(deletePublicaction(pubId));
    history.push("/");
  };
  const onNo = () => {
    history.goBack();
  };

  return (
    <Alert
      position={"absolute"}
      display={!alertSubmit[0] ? "none" : "flex"}
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
      </AlertTitle>
      <Flex direction={"column"}>
        <Button mb={"10px"} onClick={(e) => onSi(e)}>
          Si
        </Button>
        <Button onClick={(e) => onNo(e)}>No</Button>
      </Flex>
      <br />
      <AlertDescription maxWidth="sm">Recorda elegir responsablemente</AlertDescription>
    </Alert>
  );
};

export default AlertAdminDelete;
