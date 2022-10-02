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
import { blockUser, restoreUser } from "../../redux/actions";

const AlertBRUser = ({ alertBRUser, setAlertBRUser, userId, banned, userEmail }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [reasons, setReasons] = useState("");

    const onSi = async (e) => {
        e.preventDefault();

        try {
            if (!banned) {
                dispatch(blockUser(userId));
                /* await emailjs.sendForm("service_jwhjfzk", "template_99r0cuj", e.target, "SfKZ1bVFvrovCVKCZ") */
                history.push("/admin")
            } else {
                dispatch(restoreUser(userId));
                /* await emailjs.sendForm("service_jwhjfzk", "template_htqwacm", e.target, "SfKZ1bVFvrovCVKCZ") */
                history.push("/admin")
            }

        } catch (error) {
            console.log(error)
        }
    };

    const onNo = () => {
        setAlertBRUser([false, false])
    };

    return (
        <Alert
            zIndex={5}
            position={"absolute"}
            display={!alertBRUser[0] ? "none" : "flex"}
            status={!alertBRUser[1] ? "error" : "info"}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="23rem"
            top={"10rem"}
            gap={"0.5rem"}
        >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
                {banned
                    ? " ¿Estás seguro de que queres restaurar al usuario?"
                    : " ¿Estás seguro de que queres bloquear al usuario?"}
            </AlertTitle>
            <form onSubmit={onSi}>
                <Flex flexDirection={"column"} gap={"0.5rem"} alignItems={"center"}>
                    {!banned ?
                        <Textarea
                            name={"reasons_ban"}
                            value={reasons}
                            size="sm"
                            resize={"none"}
                            w={"25rem"}
                            bg={"gray.200"}
                            onChange={(e) => {
                                setReasons(e.target.value);
                            }} />
                        :
                        null}
                    <Flex gap={"1rem"}>
                        <Input display={"none"} value={userEmail}  name="user_email" readOnly />
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

export default AlertBRUser;
