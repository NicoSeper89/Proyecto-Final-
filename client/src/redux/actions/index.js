import axios from "axios";
// import Cities from "../../components/Cities/Cities";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_DETAIL = "GET_PUBLICATIONS_DETAIL";
export const GET_DETAILS = "GET_DETAILS";
export const GET_CITIES = "GET_CITIES";
export const GET_SERVICES = "GET_SERVICES,";
export const GET_PROPERTY_TYPES = "GET_PROPERTY_TYPES";
export const ULPOAD_IMG = "ULPOAD_IMG";
export const ULPOAD_IMG_USER = "ULPOAD_IMG_USER";
export const FILTER_PROP = "FILTER_PROP";
export const FILTER_AMB = "FILTER_AMB";
export const FILTER_PET = "FILTER_PET";
export const SORT_PRICE = "SORT_PRICE";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_PUBLICATION = "SET_PUBLICATION";
export const SAVEFILTER = "SAVEFILTER";
export const CLEAN = "CLEAN";
export const LOADING = "LOADING";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const VALUE_FILTER = "VALUE_FILTER";
export const SAVESORT = "SAVESORT";
export const DELETE_PUBLICACTION_IMAGE = "DELETE_PUBLICACTION_IMAGE";
export const DELETE_PUBLICACTION = "DELETE_PUBLICACTION";
export const UPDATE_PROP = "UPDATE_PROP";

/* ************ GETs ************ */
//Este get realiza el filtrado, ordenamiento y search
export function getPublications(filters, sorting, city) {
  return async function (dispatch) {
    try {
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
    let infoBack = await axios.get("/publication/" + id); //, info
    return dispatch({
      type: GET_PUBLICATIONS_DETAIL,
      payload: infoBack.data,
    });
  };
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

/* ************ FILTROS & ORDENAMIENTOS ************ */
//propfilter
export function updateFilterProp(value) {
  return {
    type: FILTER_PROP,
    payload: value,
  };
}
export function updateFilterAmbient(value) {
  return {
    type: FILTER_AMB,
    payload: value,
  };
}
export function updateFilterPets(value) {
  return {
    type: FILTER_PET,
    payload: value,
  };
}
export function updateSortingPrice(value) {
  return {
    type: SORT_PRICE,
    payload: value,
  };
}

//Esto limpia los filtros.
export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}

//Esto limpia el estado.
export function clean() {
  return {
    type: CLEAN,
  };
}

//Esto sube la imagen a la tabla propertyImages
export function imgUpload(value) {
  return async function (dispatch) {
    try {
      await axios.post("/publication/image", value);
      return dispatch({
        type: ULPOAD_IMG,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

//Esto sube la imagen a la tabla UserImages
export function imgUserUpload(value) {
  return async function (dispatch) {
    try {
      await axios.post("/publication/imageUser", value);
      return dispatch({
        type: ULPOAD_IMG_USER,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export function loading(payload) {
  return {
    type: LOADING,
    payload,
  };
}

export function setCurrentPage(page) {
  return {
    type: CURRENT_PAGE,
    payload: page,
  };
}

export function valueFilter(payload) {
  return {
    type: VALUE_FILTER,
    payload,
  };
}
//Filters en Local Storage
export function saveFilter(payload) {
  return {
    type: SAVEFILTER,
    payload,
  };
}

export function saveSort(payload) {
  return {
    type: SAVESORT,
    payload,
  };
}

export function setPublication(payload) {
  console.log('en setpub',payload)
  return {
    type: SET_PUBLICATION,
    payload,
  };
}

//ELIMINAR UNA PUBLICACION
export function deletePublicaction(id) {

  console.log(id,"id")
return async function (dispatch) {
  try {
    await axios.delete(`/publication/delete/${id}`)
    return dispatch({
      type: DELETE_PUBLICACTION
    })
  } catch (error) {
    console.log(error)
  }
}

}

// ELIMINAR UNA IMAGEN DE UNA PUBLICACION
export function deletePublicactionImage(url) {
  console.log(url, "URL");
  return async function (dispatch) {
    try {
      await axios.post(`/publication/image/delete`, url)
      return dispatch({
        type: DELETE_PUBLICACTION_IMAGE,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ACTUALIZAR DATOS DE PROPIEDAD

export function updatedProp(id, inputPropiedad) {
  console.log(inputPropiedad, "id de actualizacion", id);
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/publication/editProperty/${id}`, inputPropiedad);
      return dispatch({
        type: UPDATE_PROP,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
