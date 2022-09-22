import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

export default function PaymentOk() {
  /*  const [loading, setLoading] = useState(false); */
  const history = useHistory();
  const publicationInfo = useSelector((state) => state.publicationP);
  const busqueda = useLocation().search;
  const asignPremium = async (publicationInfo) => {
    const respuesta = {
      status: new URLSearchParams(busqueda).get("status"),
      collection_status: new URLSearchParams(busqueda).get("collection_status"),
      payment_id: new URLSearchParams(busqueda).get("payment_id"),
    };
    if (respuesta && respuesta.status === "approved") {
      await axios.put("/publication/makePremium/" + publicationInfo, {
        /* description: publicationInfo.description,
          status: publicationInfo.status,
          premium: true */
      });
    }
  };
  const onDown = () => {
    history.push("/");
  };

  useEffect(async () => {
    /* setLoading(true); */
    /* if (isAuthenticated()) {
    const userInfo = await getUserInfo();
 
    createSuscription(userInfo);
  } */
    asignPremium(publicationInfo);
  }, []);

  return (
    // <Box>
    //   <Text>Felicidades, destacaste tu publicacion</Text>
    // </Box>

    <Alert
      position={"absolute"}
      // display={!alertSubmit[0] ? "none" : "flex"}
      // status={!alertSubmit[1] ? "error" : "success"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="15rem"
      top={"10rem"}
    >
      <AlertIcon boxSize="40px" mr={0}>
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Felicidades, destacaste tu publicación
        </AlertTitle>
        <AlertDescription maxWidth="sm">Muchas gracias por utilizar nuestra web!</AlertDescription>
        <Button onClick={onDown}>Volver al inicio</Button>
      </AlertIcon>
    </Alert>
  );
}
