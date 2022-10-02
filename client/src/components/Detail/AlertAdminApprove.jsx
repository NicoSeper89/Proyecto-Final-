import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
/* import emailjs from "emailjs-com"; */

import { Button, Alert, AlertIcon, AlertTitle, AlertDescription, Flex, Input } from "@chakra-ui/react";
import { approvePostUser } from "../../redux/actions";

const AlertAdminApprove = ({ alertSubmit, setAlertAdminApprove, pubId, userId, emailUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSi = async (e) => {
    e.preventDefault();

    try {
      dispatch(approvePostUser(pubId, userId));
      /* await emailjs.sendForm("service_6rkm2fe", "template_f6k09gh", e.target, "8MtXDr5Zt_CF-tD7t") */
      history.push("/admin");
    } catch (error) {
      console.log(error)
    }

  };
  const onNo = () => {
    setAlertAdminApprove([false,false])
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
        ¿Estás seguro de que queres aprobar la publicación?"
      </AlertTitle>
      <form onSubmit={onSi}>
      <Input display={"none"} value={emailUser} name="user_email" readOnly />
      <Input display={"none"} value={pubId} name="publication_id" readOnly />
      <Flex direction={"column"}>
        <Button type="submit" mb={"10px"} >
          Si
        </Button>
        <Button onClick={(e) => onNo(e)}>No</Button>
      </Flex>
      </form>
      <AlertDescription maxWidth="sm">Recorda elegir responsablemente</AlertDescription>
    </Alert>
  );
};

export default AlertAdminApprove;
