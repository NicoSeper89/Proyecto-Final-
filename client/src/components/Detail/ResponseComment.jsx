import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Input, Button, InputGroup, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { getComment } from "../../redux/actions/index.js";
import { faComments, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResponseComment = ({ idPublication, mId, enabledResponse }) => {
  const dispatch = useDispatch();

  const [buttonResponse, setButtonResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [toUpdate, setToUpdate] = useState(false);

  useEffect(() => {}, [toUpdate]);

  const onSubmitResponse = async (e) => {
    try {
      await axios.put(`/publication/comment/response`, { messageId: mId, response });
      dispatch(getComment(idPublication));
      setToUpdate(!toUpdate);
      setButtonResponse(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      direction={"row-reverse"}
      alignItems={"center"}
      justifyContent={"space-between"}
      border="1px solid rgba(217, 217, 217, 0.55)"
      bg={"#D9D9D9"}
    >
      {enabledResponse ? (
        <InputGroup
          alignItems={"center"}
          border="1px solid rgba(217, 217, 217, 0.80)"
          borderRadius={"0.4rem"}
        >
          <Input
            placeholder="Escriba su respuesta..."
            value={response}
            onChange={(e) => {
              setResponse(e.target.value);
            }}
          />
          <Button
            cursor={"pointer"}
            size="xs"
            bg="#5e5d5d"
            color="white"
            _hover={{ bg: "#bebcbc", color: "black" }}
            onClick={onSubmitResponse}
          >
            <FontAwesomeIcon icon={faReply} />
          </Button>
        </InputGroup>
      ) : null}
      {/* {enabledResponse ? (
        <Button
          cursor={"pointer"}
          size="xs"
          bg="#5e5d5d"
          color="white"
          _hover={{ bg: "#5e5d5d", color: "white" }}
          _focus={{ bg: "#D9D9D9" }}
          onClick={() => {
            setButtonResponse(true);
          }}
        >
          <FontAwesomeIcon icon={faComments} />
        </Button>
      ) : null} */}
    </Flex>
  );
};

export default ResponseComment;
