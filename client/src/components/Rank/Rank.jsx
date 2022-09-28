import React from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Rank(prop) {

const history = useHistory();

  const ratingChanged = async (e) => {

    try {
         await axios.put(`/user/rate?id=${prop.match.params.id}&rating=${e}`)

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
        </>
    )

}