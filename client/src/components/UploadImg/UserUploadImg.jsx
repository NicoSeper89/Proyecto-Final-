import { Box, Button, Flex, FormLabel, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgUserUpload } from "../../redux/actions";

export default function UserUploadImg() {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.infoUser);
  const [preview, setPreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      previewFile(file);
      const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "czwgzdiw");

    axios
      .post("https://api.cloudinary.com/v1_1/lookhouse/image/upload", formData)
      .then((resp) => {
        dispatch(imgUserUpload({ url: resp.data.secure_url, cloudId: resp.data.public_id, userId: infoUser[0].id }))  
      })
      .catch((err) => console.log(err))
    }
  };

  return (
    <Flex
      border={"2px"}
      gap={"0.6rem"}
      borderColor={"gray.200"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      position={"relative"}
      p=".9rem"
    >
      <Text
        alignSelf={"flex-start"}
        ml="4%"
        fontWeight={"semiBold"}
        fontSize="1.2rem"
        color="gray.500"
      >
        Imagen de perfil
      </Text>
      <Flex
        flexDirection={"column"}
        w={"92%"}
        border={"2px"}
        gap={"2rem"}
        borderColor={"gray.200"}
        p={"1.4rem"}
      >
        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"25rem"}>
          {preview ? (
            <Image maxH={"98%"} src={preview} alt="chosen" />
          ) : (
            <Text color={"gray.500"}>Ningún archivo seleccionado...</Text>
          )}
        </Flex>
      </Flex>

      <FormLabel
        display={"flex"}
        alignItems={"center"}
        alignSelf={"center"}
        w={"95%"}
        border={"2px"}
        borderColor={"gray.200"}
        p={".7rem"}
        justifyContent={"center"}
      >
        <Input
          mt={".6rem"}
          color={"gray.600"}
          id={"inputFile"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          accept=".jpg, .jpeg, .png, .webp"
          border={"none"}
          type="file"
          onChange={(e) => handleChange(e)}
        />
      </FormLabel>
    </Flex>
  );
}
