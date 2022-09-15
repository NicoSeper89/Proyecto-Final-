import axios from "axios"


export function getDetail(id) {
    return async function (dispatch) {
        try {
            var detail = await axios("http://localhost:3001/" + id)
           console.log(detail)
           return dispatch({
            type:"GET_DETAILS",
            payload: detail.data
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