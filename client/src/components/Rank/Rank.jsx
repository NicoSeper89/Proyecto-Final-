import React from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useState } from "react";
import {Button} from '@chakra-ui/react'
import { useHistory } from "react-router-dom";

export default function Rank(prop) {

 const history = useHistory()

  const [start, setStart] = useState(0);


  const ratingChanged = (e) => {
    setStart(e);
  }

  const onClickButton = async () => {

    try {
       const res = await axios.put(`/user/rate?id=${prop.match.params.id}&rating=${start}`, {userId: prop.user2[0].id})
       history.push("/")
    } catch (error) {
        console.log(error)
    }

    }

    return (
        <>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
            />
            <Button onClick={onClickButton}>enviar puntos</Button>
        </>
    )

}