import React from "react";
import { useHistory /*, useLocation*/ } from "react-router-dom";
import { Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useState } from "react";

const AlertLogin = ({ loguear }) => {
  const { /*isAuthenticated , user, loginWithRedirect, isLoading,*/ logout } = useAuth0();
  const history = useHistory();
  const rankURL = window.localStorage.getItem("Rank_Publications");
  const [state, setState] = useState(false);
 console.log(loguear)
  useEffect(() => {
    if (state) {
      const idUrl = rankURL;
      window.localStorage.removeItem("Rank_Publications");
      history.push(`/details/${idUrl}/rank`);
    }
  }, [history, state, rankURL]);

  const onDown = () => {
    if (loguear.loguear) {
      if (!rankURL) {
        history.push("/");
      } else {
        setState(true);
      }
    } else {
      logout();
    }
  };

  //warning
  return (
    <Alert
      position={"absolute"}
      display={"flex"}
      status={loguear.loguear === undefined ? "info" : loguear.banned? "warning" : loguear.loguear ? "success" : "error"}
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
        {loguear.loguear === undefined
          ? "Verificando Informacion"
          : loguear.banned? "Este usuario esta Bloqueado"
          : loguear.loguear
          ? "Logueado Exitosamente"
          : "Informacion Incorrecta"}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {loguear.loguear !== false
          ? "Muchas gracias por utilizar nuestra web!"
          : loguear.banned? "Ya no puedes acceder a tu cuenta"
          : "Si iniciaste sesion anteriormente con Google por favor elige esa opcion"}
      </AlertDescription>
      {loguear.loguear !== undefined ? (
        <Button padding="20px" marginTop="10px" onClick={onDown}>
          Volver
        </Button>
      ) : null}
    </Alert>
  );
};

export default AlertLogin;
