import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "emailjs-com";

import {
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Input,
    Flex,
    Textarea
} from "@chakra-ui/react";
import { deletePublicaction } from "../../redux/actions";

const AlertAdminDelete = ({ alertAdminDelete, setAlertAdminDelete, emailUser, pubId, deleted }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [reasons, setReasons] = useState("");

    const onSi = async (e) => {
        e.preventDefault();
        
        try {
            dispatch(deletePublicaction(pubId));
            await emailjs.sendForm("service_0za37f4", "template_wo7kki4", e.target, "E_nOOl9VRDZAxSlhF")
            history.push("/")
          } catch (error) {
            console.log(error)
          }
    };

    const onNo = () => {
        setAlertAdminDelete([false,false])
    };

    return (
        <Alert
            position={"absolute"}
            display={!alertAdminDelete[0] ? "none" : "flex"}
            status={!alertAdminDelete[1] ? "error" : "info"}
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
                {deleted
                    ? " ¿Estás seguro de que queres restaurar la publicación?"
                    : " ¿Estás seguro de que queres eliminar la publicación?"}
            </AlertTitle>
            <form style={{ padding: "1rem" }} onSubmit={onSi}>
                <Flex flexDirection={"column"} alignItems={"center"} gap={"1rem"}>
                    <Textarea name={"reasons_delete"}
                        value={reasons}
                        size="sm"
                        resize={"none"}
                        w={"25rem"}
                        bg={"gray.200"}
                        onChange={(e) => { setReasons(e.target.value) }} />
                    <Input
                        display={"none"}
                        value={`http://localhost:3000/details/${pubId}`}
                        name="url_publication"
                        readOnly
                    />
                    <Input
                        display={"none"}
                        value={emailUser}
                        name="user_email"
                        readOnly
                    />
                    <Flex gap={"1rem"}>
                        <Button type="submit" mb={"10px"} >
                            Si
                        </Button>
                        <Button onClick={(e) => onNo(e)}>No</Button>
                    </Flex>
                </Flex>
            </form>
            <AlertDescription maxWidth="sm">Recorda elegir responsablemente</AlertDescription>
        </Alert>
    );
};

export default AlertAdminDelete;
