import { Box, Button, Flex, FormLabel, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { imgUserUpload } from "../../redux/actions";

export default function UserUploadImg({ inputPropiedad, setInputPropiedad }) {
  const dispatch = useDispatch();
  const [fileInput, setFileInput] = useState("");
  const [preview, setPreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // const [disableButtonUploadImg, setDisableButtonUploadImg] = useState(true);

  // useEffect(() => {
  //   if (inputPropiedad.img.length >= 7) {
  //     setDisableButtonUploadImg(true);
  //   } else {
  //     setDisableButtonUploadImg(false);
  //   }
  // }, [inputPropiedad.img.length, setDisableButtonUploadImg]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const upload = () => {
    const formData = new FormData();
    formData.append("file", fileInput);
    formData.append("upload_preset", "czwgzdiw");

    axios
      .post("https://api.cloudinary.com/v1_1/lookhouse/image/upload", formData)
      .then((resp) => {
        dispatch(imgUserUpload({ url: resp.data.secure_url, cloudId: resp.data.public_id }));
        setInputPropiedad({
          ...inputPropiedad,
          img: [...inputPropiedad.img, { url: resp.data.secure_url, cloudId: resp.data.public_id }],
        });
      })
      .catch((err) => console.log(err))
      .finally(
        setFileInput(""),
        setPreview(""),
        setSuccessMsg("Image uploaded successfully"),
        setTimeout(() => {
          setSuccessMsg("");
        }, 2000)
      );
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      previewFile(file);
      setFileInput(event.target.files[0]);
    }
  };

  return (
    <Box>
      <Flex>
        {preview ? (
          <Image maxH={"98%"} src={preview} alt="chosen" />
        ) : successMsg ? (
          <Text>{successMsg}</Text>
        ) : (
          <Text color={"gray.500"}>Ningún archivo seleccionado...</Text>
        )}
      </Flex>
      <FormLabel>
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
        <Button
          // disabled={disableButtonUploadImg}
          colorScheme="blue"
          value={"Cargar"}
          onClick={upload}
        >
          Agregar
        </Button>
      </FormLabel>
    </Box>
  );
}
