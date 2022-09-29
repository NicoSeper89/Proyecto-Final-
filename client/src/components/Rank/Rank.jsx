import React from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    useColorModeValue,
    Image
} from '@chakra-ui/react';
import logoImg from "../../Image/Logo LookHouse.png";

export default function Rank(prop) {

    const history = useHistory()
    
    const [start, setStart] = useState(0);

    const ratingChanged = (e) => {
        setStart(e);
    }

    const onClickButton = async () => {

        try {
            const res = await axios.put(`/user/rate?publicationId=${prop.match.params.id}&rating=${start}`, { userIdRequired: prop.userRank[0].id })
            history.push("/")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            py={12}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                boxShadow={'2xl'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={10}
                spacing={8}
                align={'center'}>
                <Image h={"200px"} marginTop={"35px"} src={logoImg} alt="homeLogo" />
                <Stack align={'center'} spacing={2}>
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'2xl'}
                        color={useColorModeValue('gray.800', 'gray.200')}>
                        CALIFICAR PROPIETARIO
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.500'}>
                        El propietario blabla solicitó que lo califiques
                    </Text>
                </Stack>
                <Stack spacing={4} alignItems={"center"} w={'full'}>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={52}
                        activeColor="#F6AD55"
                        edit={true}
                    />
                    <Button colorScheme="green" onClick={onClickButton}>Enviar</Button>
                </Stack>
            </Stack>
        </Flex>
    )

}