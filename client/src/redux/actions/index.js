import axios from "axios";
// import Cities from "../../components/Cities/Cities";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_DETAIL = "GET_PUBLICATIONS_DETAIL";
export const GET_DETAILS = "GET_DETAILS";
export const GET_CITIES = "GET_CITIES";
export const GET_SERVICES = "GET_SERVICES,";
export const GET_PROPERTY_TYPES = "GET_PROPERTY_TYPES";
export const FILTER_PROP = "FILTER_PROP";
export const FILTER_AMB = "FILTER_AMB";
export const CLEAN = "CLEAN";
export const LOADING = "LOADING";

//esto va?
export const HOUSES = "HOUSES";

/* ************ GETs ************ */
//Este get realiza el filtrado, ordenamiento y search
export function getPublications(filters, sorting, city) {
  return async function (dispatch) {
    try {
      dispatch(loading());
      let info = {
        filters,
        sorting,
      };
      let infoBack = await axios.post("/publication?city=" + city, info); //,?city='+city
      return dispatch({
        type: GET_PUBLICATIONS,
        payload: infoBack.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

//Esto es para ver el detalle de la publicación
export function getPublicationsDetail(id) {
  return async function (dispatch) {
    console.log(id,"id")
 
      let infoBack = await axios.get("/publication/" + id); //, info
      console.log(infoBack, "infoback")
      return dispatch({
        type: GET_PUBLICATIONS_DETAIL,
        payload: infoBack.data,
      
  })}
}

//Esto trae las Provincias
export function getCities() {
  return async function (dispatch) {
    try {
      let infoBack = await axios.get("/publication/city");
      return dispatch({
        type: GET_CITIES,
        payload: infoBack.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

//Esto trae los servicios de luz, agua, gas, internet y calefaccion
export function getServices() {
  return async function (dispatch) {
    try {
      let infoBack = await axios.get("/publication/serviceTypes");
      return dispatch({
        type: GET_SERVICES,
        payload: infoBack.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

//Esto trae los tipo de propiedades: departamento, casa, local, etc.
export function getTypesOfProperties() {
  return async function (dispatch) {
    try {
      let infoBack = await axios.get("/publication/propertyTypes");
      return dispatch({
        type: GET_PROPERTY_TYPES,
        payload: infoBack.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}
//propfilter
export function updateFilterProp(value) {
  return {
    type: FILTER_PROP,
    payload: value
  };
}
export function updateFilterAmbient(value) {
  return {
    type: FILTER_AMB,
    payload: value
  };
}
//Esto limpia el estado.
export function clean() {
  return {
    type: CLEAN,
  };
}

export function loading(payload) {
  return {
    type: LOADING,
    payload,
  };
}

//ESTO HAY QUE BORRAR
/* ************ FILTROS & ORDENAMIENTOS ************ */
// export const searcHouse = (city) => async (dispatch) => {
//   //    const houses = await axios(`http://localhost:3001/${name}`) proximamente....

//   const houses = Cities.filter((e) => e.ciudad.toLowerCase().includes(city.toLowerCase()));
//   dispatch({ type: HOUSES, payload: houses });
// };

// export const filter = (tipo, data) => async (dispatch) => {
//   // const houses2 = await axios(`http://localhost:3001/${data}`) proximamente....
//   var houses2;
//   if (tipo === "ambientes") {
//     houses2 = Cities.filter((e) => e[tipo] === data * 1);
//   } else {
//     houses2 = Cities.filter((e) => e[tipo] === data); // en construccion....
//   }

//   if (houses2.length) dispatch({ type: HOUSES, payload: houses2 });
//   else dispatch({ type: HOUSES, payload: Cities });
// };

// /* ********** Filtro de Mayor y Menor Precio ************* */
// export const precio = (data) => (dispatch) => {
//   var ordenScore = (a, z) => {
//     var peso1 = a.precio;
//     var peso2 = z.precio;
//     if (peso1 > peso2) {
//       return data === "Menor Precio" ? 1 : -1;
//     }
//     if (peso1 < peso2) {
//       return data === "Menor Precio" ? -1 : 1;
//     }
//     return 0;
//   };
//   var houses3 = [...Cities.sort(ordenScore)];

//   dispatch({ type: HOUSES, payload: houses3 });
// };
