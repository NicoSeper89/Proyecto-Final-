import axios from "axios"


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