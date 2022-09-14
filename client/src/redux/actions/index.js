import axios from "axios"
import Cities from "../../components/Cities/Cities"


export function getDetail(id) {
    return async function (dispatch) {
        try {
            var details = await axios("http://localhost:3001/" + id)
           console.log(details)
           return dispatch({
            type:"GET_DETAILS",
            payload: details.data
           })
        }
         catch (error) {
            console.log(error)
        }
    }
}

export function clean(){
    return {
        type: "CLEAN",
    }
}

export const searcHouse = (city)=> async (dispatch)=> {
//    const houses = await axios(`http://localhost:3001/${name}`) proximament....
    const houses = Cities.filter(e => e.ciudad.includes(city))
    dispatch({type: "SEARCH", payload:houses })
}