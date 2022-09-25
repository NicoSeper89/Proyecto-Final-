import React from "react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
// import style from "./Help.module.css";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Help() {
  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBarForms />
      <Flex
        direction={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        textAlign={"justify"}
        p={"50px"}
        paddingTop={"100px"}
        // className={style.containerText}
      >
        <Text as="b" textTransform={"uppercase"} fontSize="2xl">
          Ayuda
        </Text>
        <Text as="samp" fontSize="xl">
          ¿Cómo me registro en LookHouse?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          El registro lo podes realizar muy facilmente ingresando con tu cuenta de Google, o
          registrándote con tu email. Y así es como podés formar parte de nuestra comunidad!
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Cómo puedo realizar una publicación?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          Si sos propietario, podes acceder al formulario de creación desde el menu de opciones
          desplegable. En el mismo deberás rellenar los datos de tu propiedad, podrás agregar una
          descripción con tus palabras y adjuntar las imagenes de la misma.
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          Recorda de que los datos e imagenes que ingresaste se correspondan con la propiedad, ya
          que de lo contrario tu publicación podra ser reportada y eso bajara tu clasificación
          general como propietario.
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Cómo puedo editar o borrar una publicación?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          Para editar una publicación dirigite a la lista de todas tus publicaciones en tu perfil,
          selecciona la publicación que deseas modificar y abri su detalles y desde ahi podes acceder 
          a los botones de edición o borrado.
          Tambien podes acceder al detalle de tu publicación desde la vista general de la página en donde
          figuran todas las publicaciones.
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Qué es una publicación destacada?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          Las publicaciones destacadas son publicaciones que aparecen en un sector especial y más visible de la página,
          aumentando asi su visibilidad frente a posibles inquilinos.
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Cómo destaco mi publicación?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          Luego de crear una publicación se te dará la opción de destacarla, al seleccionarla te redirigirá
          a la páginade mercadopago, completá con tus datos y finalizá la compra. Cuando vuelvas a la página principal
          ya podrás visualizarla entre los destacados. 
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          No destaqué mi publicación cuando la creé y ahora quiero hacerlo ¿qué hago?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          No te preocupes, en tu perfil figura una lista de todas tus publicaciones, desde donde vas a tener
          la opción de destacar cualquiera de ellas, en cualquier momento.
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Cómo me contacto con el dueño de una propiedad que me interesa?
        </Text>
        <Text style={{ textIndent: 20 }} w={"400px"} h={"100%"}>
          Dentro del detalle de cada publicación figuran los datos del dueño de la misma. Entre ellos encontraras
          los medios de contacto que proveyó.
        </Text>
      </Flex>
      <Footer />
    </Box>
  );
}
