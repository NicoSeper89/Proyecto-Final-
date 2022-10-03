import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import { Box, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import {getComment} from "../../redux/actions/index.js"

const ResponseComment = ({idPublication, mId, enabledResponse}) => {

    const dispatch = useDispatch()

    const [buttonResponse, setButtonResponse] = useState(false)
    const [response, setResponse] = useState("");
    const [toUpdate, setToUpdate] = useState(false);

    useEffect(() => {

    }, [toUpdate])

    const onSubmitResponse = async (e) => {
        try {
            await axios.put(`/publication/comment/response`, {messageId: mId, response});
            dispatch(getComment(idPublication));
            setToUpdate(!toUpdate);
            setButtonResponse(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            {(buttonResponse) ?
                <Box>
                    <Input value={response} onChange={(e) => {setResponse(e.target.value)}} ></Input>
                    <Button
                        cursor={"pointer"}
                        size="xs"
                        _hover={{ bg: "#FF8181", color: "white" }}
                        onClick={onSubmitResponse}>
                        Enviar respuesta
                    </Button>
                </Box>
                :
                null}
            {enabledResponse? <Button
                cursor={"pointer"}
                size="xs"
                _hover={{ bg: "#FF8181", color: "white" }}
                onClick={() => { setButtonResponse(true) }}>
                Responder
            </Button>: null}
            
        </Box>
    )
}

export default ResponseComment;