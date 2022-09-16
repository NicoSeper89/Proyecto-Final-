import axios from "axios";
import Cities from "../../components/Cities/Cities";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_DETAIL = "GET_PUBLICATIONS_DETAIL";


// export function getDetail(id) {
//   return async function (dispatch) {
//     try {
//       var details = await axios("http://localhost:3001/property" + id);
//       console.log(details);
//       return dispatch({
//         type: "GET_DETAILS",
//         payload: details,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getDetail = (id) => async (dispatch) => {
  const houseId = Cities.filter((e) => e.id === id)
  dispatch({ type: "GET_DETAILS", payload: houseId })
}

/* ************ FILTROS & ORDENAMIENTOS ************ */

export const searcHouse = (city) => async (dispatch) => {
  //    const houses = await axios(`http://localhost:3001/${name}`) proximamente....

  const houses = Cities.filter((e) => e.ciudad.toLowerCase().includes(city.toLowerCase()));
  dispatch({ type: "HOUSES", payload: houses });
};

export const filter = (tipo, data) => async (dispatch) => {
  // const houses2 = await axios(`http://localhost:3001/${data}`) proximamente....
  var houses2;
  if (tipo === "ambientes") {
    houses2 = Cities.filter((e) => e[tipo] === data * 1);
  } else {
    houses2 = Cities.filter((e) => e[tipo] === data); // en construccion....
  }

  if (houses2.length) dispatch({ type: "HOUSES", payload: houses2 });
  else dispatch({ type: "HOUSES", payload: Cities });
};

//    ********** Filtro de Mayor y Menor Precio **************

export const precio = (data) => (dispatch) => {

  var ordenScore = (a, z) => {
    var peso1 = a.precio
    var peso2 = z.precio
    if (peso1 > peso2) {
      return data === "Menor Precio" ? 1 : -1
    }
    if (peso1 < peso2) {
      return data === "Menor Precio" ? -1 : 1
    }
    return 0
  }
  var houses3 = [...Cities.sort(ordenScore)]

  dispatch({ type: "HOUSES", payload: houses3 })


}

export function clean() {
  return {
    type: "CLEAN",
  };
}

export function getPublications(filters, sorting,city) {
  return async function (dispatch) {
    try {
      let info ={
        filters,
        sorting
      }
      let infoBack = await axios.get('/publication?city='+city,info);//, info
      return dispatch({
        type: GET_PUBLICATIONS,
        payload: infoBack.data
      });
    } catch (error) {
      if (error.response) { alert(error.response.data) }
    }
  }
}

export function getPublicationsDetail(id) {
  return async function (dispatch) {
    try {
      let infoBack = await axios.get('/publication/',id);//, info
      return dispatch({
        type: GET_PUBLICATIONS_DETAIL,
        payload: infoBack.data
      });
    } catch (error) {
      if (error.response) { alert(error.response.data) }
    }
  }
}
