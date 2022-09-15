import axios from "axios";
import Cities from "../../components/Cities/Cities";

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var details = await axios("http://localhost:3001/" + id);
      console.log(details);
      return dispatch({
        type: "GET_DETAILS",
        payload: details.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
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

export function clean() {
  return {
    type: "CLEAN",
  };
}
