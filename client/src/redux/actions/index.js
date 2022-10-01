import axios from "axios";
import { bindActionCreators } from "redux";
// import Cities from "../../components/Cities/Cities";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_PUBLICATIONS_DETAIL = "GET_PUBLICATIONS_DETAIL";
export const GET_DETAILS = "GET_DETAILS";
export const GET_CITIES = "GET_CITIES";
export const GET_SERVICES = "GET_SERVICES,";
export const GET_PROPERTY_TYPES = "GET_PROPERTY_TYPES";
export const ULPOAD_IMG = "ULPOAD_IMG";
export const UPLOAD_IMG_USER = "UPLOAD_IMG_USER";
export const FILTER_PROP = "FILTER_PROP";
export const FILTER_AMB = "FILTER_AMB";
export const FILTER_GAR = "FILTER_GAR";
export const FILTER_PET = "FILTER_PET";
export const SORT = "SORT";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_PUBLICATION = "SET_PUBLICATION";
export const SAVEFILTER = "SAVEFILTER";
export const CLEAN = "CLEAN";
export const LOADING = "LOADING";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const CURRENT_CARRUSEL = "CURRENT_CARRUSEL";
export const VALUE_FILTER = "VALUE_FILTER";
export const SAVESORT = "SAVESORT";
export const DELETE_PUBLICACTION_IMAGE = "DELETE_PUBLICACTION_IMAGE";
export const DELETE_PUBLICACTION = "DELETE_PUBLICACTION";
export const DELETE_PUBLICACTION_PERMANENT = "DELETE_PUBLICACTION_PERMANENT";
export const UPDATE_PROP = "UPDATE_PROP";
export const GET_PUBLICATIONS_PREMIUM = "GET_PUBLICATIONS_PREMIUM";
export const INFO_USER = "INFO_USER";
export const EDIT_USER = "EDIT_USER";
export const RANK_USER = "RANK_USER";
export const GET_PUBLICATION_USER = "GET_PUBLICATION_USER";
export const GET_FAVORITES_USER = "GET_FAVORITES_USER";
export const SET_FAVORITE = "SET_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const GETUSER = "GETUSER";
export const GET_USER_IMAGE = "GET_USER_IMAGE";
export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";
export const REPORT_PUBLICATION = "REPORT_PUBLICATION";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const GET_ALL_PUBLICATIONS = "GET_ALL_PUBLICATIONS";
export const GET_PUBLICATIONS_NAVAILABLE = "GET_PUBLICATIONS_NAVAILABLE";
export const GET_REPORTS = "GET_REPORTS";
export const GET_REPORTS_ID = "GET_REPORTS_ID";
export const GET_FOR_APPROVAL = "GET_FOR_APPROVAL";
export const APPROVE_POST_USER = "APPROVE_POST_USER";
export const TOTAL_USERS = "TOTAL_USERS";
export const TOTAL_DATES = "TOTAL_DATES"
export const TOTAL_USER_DATES = "TOTAL_USER_DATES"
export const BLOCK_USER = "BLOCK_USER"
export const RESTORE_USER = "RESTORE_USER"
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

export function getPublicationsPremium() {
  return async function (dispatch) {
    try {
      let info = await axios.get("/publication/premium");
      return dispatch({
        type: GET_PUBLICATIONS_PREMIUM,
        payload: info.data,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//Esto trae las publicaciones del mismo usuario
export function getPubs(id) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/user/getPubs/${id}`);
      let infoDeleted = await axios.get(`/user/getPubsDeleted/${id}`);
      let response = {
        pubs: info.data,
        pubsBorradas: infoDeleted.data,
      };
      return dispatch({
        type: GET_PUBLICATION_USER,
        payload: response,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//Esto trae las publicaciones favoritas del mismo usuario
export function getFavsUser(id) {
  return async function (dispatch) {
    try {
      let info = await axios.get(`/user/getFavs/${id}`);
      return dispatch({
        type: GET_FAVORITES_USER,
        payload: info.data,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };
}

//Esto setea una publicacion en favoritos del usuario
export function setFav(id, pubId) {
  return async function (dispatch) {
    try {
      await axios.put(`/user/setFav?userId=${id}&pubId=${pubId}`, {});
      return dispatch({
        type: SET_FAVORITE,
      });
    } catch (error) {
      alert(error);
    }
  };
}
//Esto quita una publicacion en favoritos del usuario
export function removeFav(id, pubId) {
  return async function (dispatch) {
    try {
      await axios.put(`/user/removeFav?userId=${id}&pubId=${pubId}`, {});
      return dispatch({
        type: REMOVE_FAVORITE,
      });
    } catch (error) {
      alert(error);
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
export function updateFilterGarage(value) {
  return {
    type: FILTER_GAR,
    payload: value,
  };
}

export function updateFilterPets(value) {
  return {
    type: FILTER_PET,
    payload: value,
  };
}
export function updateSorting(value) {
  return {
    type: SORT,
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
      await axios.post("/user/imageUser", value);
      return dispatch({
        type: UPLOAD_IMG_USER,
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

export function setCurrentCarrusel(page) {
  return {
    type: CURRENT_CARRUSEL,
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
  console.log("en setpub", payload);
  return {
    type: SET_PUBLICATION,
    payload,
  };
}

//ELIMINAR UNA PUBLICACION TEMPORALMENTE
export function deletePublicaction(id) {
  return async function (dispatch) {
      let respuesta=await axios.put(`/publication/unavailable/${id}`);
      return dispatch({
        type: DELETE_PUBLICACTION,
      });
  };
}
//ELIMINAR UNA PUBLICACION
export function deletePublicactionPermanent(id) {
  return async function (dispatch) {
      let respuesta=await axios.delete(`/publication/delete/${id}`);
      return dispatch({
        type: DELETE_PUBLICACTION_PERMANENT,
      });
  };
}

// ELIMINAR UNA IMAGEN DE UNA PUBLICACION
export function deletePublicactionImage(url) {
  return async function (dispatch) {
    try {
      await axios.post(`/publication/image/delete`, url);
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
      await axios.put(`/publication/editProperty/${id}`, inputPropiedad);
      return dispatch({
        type: UPDATE_PROP,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ACTUALIZAR DATOS DE USUARIO
export function editUser(id, input) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`/user/editUser/${id}`, input);
      return dispatch({
        type: EDIT_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function rank(id, rank) {
  return async function (dispatch) {
    try {
      await axios.put(`/user/rate?id=${id}&rating=${rank}`, {});
      return dispatch({
        type: RANK_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Info del usuario
export function getInfoUser(user) {
  return {
    type: INFO_USER,
    payload: user,
  };
}

export function getUserInfo(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/user/userInfo/${id}`);
      return dispatch({
        type: GETUSER,
        payload: resp.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export async function getTotalUsers(dispatch) {
  try {
    const res = await axios.get("/admin/totalUsers");
    return dispatch({
      type: TOTAL_USERS,
      payload: res.data,
    });
  } catch (error) {
    alert(error.data);
  }
}

export function getUserImage(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/user/getImage/${id}`);
      return dispatch({
        type: GET_USER_IMAGE,
        payload: resp.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export function getComment(publicationId) {
  return async function (dispatch) {
    try {
      const comments = await axios.get(`/publication/comment/${publicationId}`);
      return dispatch({
        type: GET_COMMENT,
        payload: comments.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}
// Esto es para reportar una publicación
export function reportPublication(id, input) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`/publication/report/${id}`, input);
      return dispatch({
        type: REPORT_PUBLICATION,
        payload: res.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}
//trae todas las publis
export function getAll() {
  return async function (dispatch) {
    try {
      const respuesta = await axios.get("/publication/allpublications");
      return dispatch({
        type: GET_ALL_PUBLICATIONS,
        payload: respuesta.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

//trae publis borradas
export function getPubliNoAvail() {
  return async function (dispatch) {
    try {
      const respuesta = await axios.get("/publication/allpublications");
      return dispatch({
        type: GET_PUBLICATIONS_NAVAILABLE,
        payload: respuesta.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export function postComment(message, publicationId) {
  return async function (dispatch) {
    try {
      await axios.post(`/publication/comment`, { message, publicationId });
      return dispatch({
        type: POST_COMMENT,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

//todos los reportes
export function getReports() {
  return async function (dispatch) {
    try {
      const respuesta = await axios.get("/publication/reportList");
      return dispatch({
        type: GET_REPORTS,
        payload: respuesta.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}
//todos los reportes de una publciacion
export function getReportsId(id) {
  return async function (dispatch) {
    try {
      const respuesta = await axios.get("/publication/reportList/" + id);
      return dispatch({
        type: GET_REPORTS_ID,
        payload: respuesta.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}
//todas las pubis a aprobar
export function getForApproval() {
  return async function (dispatch) {
    try {
      const respuesta = await axios.get("/publication/forApproval");
      return dispatch({
        type: GET_FOR_APPROVAL,
        payload: respuesta.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}
//aprobar publicacion
export function approvePostUser(pubId, userId) {
  return async function (dispatch) {
    try {
      const respuesta = await axios.put("/publication/approvePost/" + pubId);
      const respuesta2 = await axios.put("/publication/approveUser/" + userId);
      return dispatch({
        type: APPROVE_POST_USER,
        /*       payload: respuesta.data */
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export function deleteComment(id) {
  console.log("soy id", id);
  // console.log("soy publicationID", idComment)
  try {
    return async function (dispatch) {
      await axios.delete(`/publication/comment/${id}`);
      return dispatch({
        type: DELETE_COMMENT,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function allDates(){
  return async(dispatch)=>{
   const resp = await axios.get('/admin/pubDates')
   return dispatch({
    type: TOTAL_DATES,
    payload: resp.data
   })
  }
}

export function allUserDates(){
  return async(dispatch)=>{
   const resp = await axios.get('/admin/userDates')
   return dispatch({
    type: TOTAL_USER_DATES,
    payload: resp.data
   })
  }
}

export function blockUser(id) {
  try {
    return async function (dispatch) {
      await axios.put(`/user/deleteUser/${id}`);
      return dispatch({
        type: BLOCK_USER,
      });
    };
  } catch (error) {
    console.log(error);
  }
}
export function restoreUser(id) {
  try {
    return async function (dispatch) {
      await axios.put(`/user/restoreUser/${id}`);
      return dispatch({
        type: RESTORE_USER,
      });
    };
  } catch (error) {
    console.log(error);
  }
}