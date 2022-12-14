import {
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_DETAIL,
  GET_DETAILS,
  /* GET_CITIES, */
  GET_SERVICES,
  GET_PROPERTY_TYPES,
  CLEAN,
  ULPOAD_IMG,
  FILTER_PROP,
  FILTER_AMB,
  FILTER_PET,
  FILTER_GAR,
  SORT,
  CLEAR_FILTERS,
  LOADING,
  CURRENT_PAGE,
  CURRENT_CARRUSEL,
  VALUE_FILTER,
  SAVEFILTER,
  SAVESORT,
  DELETE_PUBLICACTION,
  DELETE_PUBLICACTION_IMAGE,
  SET_PUBLICATION,
  UPDATE_PROP,
  GET_PUBLICATIONS_PREMIUM,
  INFO_USER,
  EDIT_USER,
  GET_PUBLICATION_USER,
  GET_FAVORITES_USER,
  SET_FAVORITE,
  REMOVE_FAVORITE,
  RANK_USER,
  GETUSER,
  UPLOAD_IMG_USER,
  GET_USER_IMAGE,
  GET_COMMENT,
  POST_COMMENT,
  REPORT_PUBLICATION,
  GET_ALL_PUBLICATIONS,
  GET_PUBLICATIONS_NAVAILABLE,
  DELETE_COMMENT,
  GET_REPORTS,
  GET_REPORTS_ID,
  GET_FOR_APPROVAL,
  APPROVE_POST_USER,
  TOTAL_USERS,
  DELETE_PUBLICACTION_PERMANENT,
  TOTAL_DATES,
  TOTAL_USER_DATES,
  RESTORE_USER,
  BLOCK_USER,
  DELETE_REPORT,
  SET_CITY
} from "../actions";

const initialState = {
  totalUsers: [], //Total de usuarios
  allUserInfo: {},
  infoUser: null,
  houses: [], //Todas las publicaciones
  housePrem: [], //Publicación Premium
  housesEliminadas: [], //publicaciones eliminadas
  services: [],
  typeOfProperties: [],
  city: "",
  detail: {},
  filters: {
    publication: [], //se lo llena con {name:'nombre como en el modelo',value:'string o num'},
    property: [], //se lo llena con {name:'nombre como en el modelo',value:'string o num'},
    typeOfProp: "", // es un string que si no se lo usa tiene que estar vacio, y sino va el name de la propiedad
    services: [], //{ name: "luz" }, { name: "agua" }, etc
  },
  sorting: { name: "default", direccion: "minMax" }, // va el criterio de ordenamiento en name(de acuerdo al modelo), y en direccion minMax o maxMin
  loading: false,
  currentPage: 1, //Posición de página de todas las publicaciones
  currentCarrusel: 1, //Posición de página de las destacadas
  valueFilter: "",
  publicationP: "",
  publicationsUser: [], //publicaciones de cada usuario
  publicationsUserDeleted: [],
  favoritesUser: [], //favoritos de cada usuario
  favoritesUserId: [],
  imageUser: "",
  comments: [],
  reports: [],
  reportsId: [],
  forApproval: [],
  dates: [],
  userDates: [],
  imageUser2: ""
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city: action.payload
      }
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAN:
      return {
        ...state,
        detail: {},
      };
    case GET_PUBLICATIONS:
      return {
        ...state,
        houses: action.payload,
      };
    case GET_PUBLICATIONS_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    /* case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      }; */
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case GET_PROPERTY_TYPES:
      return {
        ...state,
        typeOfProperties: action.payload,
      };
    case ULPOAD_IMG:
      return {
        ...state,
      };
    case FILTER_PROP:
      if (action.payload === "Propiedad") {
        state.filters.typeOfProp = "";
      } else {
        state.filters.typeOfProp = action.payload;
      }
      return {
        ...state,
      };
    case FILTER_AMB:
      if (action.payload === "") {
        //default action entonces limpia el filtro ok
        let index = state.filters.property.findIndex((i) => i.name === "environments");
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
      } else {
        // primero limpia el filtro anterior y despues pushea el actual que queremos usar
        let index = state.filters.property.findIndex((i) => i.name === "environments");
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
        state.filters.property.push({ name: "environments", value: parseInt(action.payload) });
      }
      return {
        ...state,
      };
    case FILTER_GAR:
      if (action.payload === "") {
        //default action entonces limpia el filtro ok
        let index = state.filters.property.findIndex((i) => i.name === "garage");
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
      } else {
        // primero limpia el filtro anterior y despues pushea el actual que queremos usar
        let index = state.filters.property.findIndex((i) => i.name === "garage");
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
        state.filters.property.push({ name: "garage", value: parseInt(action.payload) });
      }
      return {
        ...state,
      };

    case FILTER_PET:
      let value = true;
      if (action.payload === "Mascotas") {
        let index = state.filters.property.findIndex((i) => i.name === "pets");
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
      } else {
        if (action.payload === "true") {
          value = true;
        } else if (action.payload === "false") {
          value = false;
        }
        let index = state.filters.property.findIndex((i) => i.name === "pets");
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
        state.filters.property.push({ name: "pets", value: value });
      }
      return {
        ...state,
      };

    case SORT:
      return {
        ...state,
        sorting: { name: action.payload.name, direccion: action.payload.direccion },
      };

    case CLEAR_FILTERS:
      state.filters = {
        publication: [],
        property: [],
        typeOfProp: "",
        services: [],
      };
      state.sorting = { name: "default", direccion: "minMax" };
      state.city = ""
      return {
        ...state,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CURRENT_CARRUSEL:
      return {
        ...state,
        currentCarrusel: action.payload,
      };
    case GET_PUBLICATIONS_PREMIUM:
      let premNotDeleted = action.payload.filter((h) => !h.deleted);
      return {
        ...state,
        housePrem: premNotDeleted,
      };
    case VALUE_FILTER:
      return {
        ...state,
        valueFilter: action.payload,
      };
    case SAVEFILTER:
      return {
        ...state,
        filters: action.payload,
      };
    case SAVESORT:
      return {
        ...state,
        sorting: action.payload,
      };
    case DELETE_PUBLICACTION:
      return {
        ...state,
      };
    case DELETE_PUBLICACTION_PERMANENT:
      return {
        ...state,
      };

    case DELETE_PUBLICACTION_IMAGE:
      return {
        ...state,
      };
    case SET_PUBLICATION:
      return {
        ...state,
        publicationP: action.payload,
      };

    case UPDATE_PROP:
      return {
        ...state,
      };

    case EDIT_USER:
      return {
        ...state,
      };

    case REPORT_PUBLICATION:
      return {
        ...state,
      };

    case INFO_USER:
      return {
        ...state,
        infoUser: action.payload,
      };
    case GET_PUBLICATION_USER:
      return {
        ...state,
        publicationsUser: action.payload.pubs,
        publicationsUserDeleted: action.payload.pubsBorradas,
      };
    case GET_FAVORITES_USER:
      return {
        ...state,
        favoritesUser: action.payload,
      };
    case SET_FAVORITE:
      return {
        ...state,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
      };
    case RANK_USER:
      return {
        ...state,
      };
    case GETUSER:
      return {
        ...state,
        allUserInfo: action.payload,
      };
    case UPLOAD_IMG_USER:
      return {
        ...state,
      };
    case GET_USER_IMAGE:
      let imagen = action.payload[0] ? action.payload[0].url : null;
      return {
        ...state,
        imageUser: imagen,
      };
    case GET_COMMENT:
      // console.log(action.payload);
      return {
        ...state,
        comments: action.payload,
      };
    case POST_COMMENT:
      return {
        ...state,
      };
    case GET_ALL_PUBLICATIONS:
      return {
        ...state,
        houses: action.payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
      };
    case GET_PUBLICATIONS_NAVAILABLE:
      const noAvailable = action.payload.filter((p) => p.deleted);
      return {
        ...state,
        housesEliminadas: noAvailable,
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: action.payload,
      };
    case GET_REPORTS_ID:
      return {
        ...state,
        reportsId: action.payload,
      };
    case GET_FOR_APPROVAL:
      return {
        ...state,
        forApproval: action.payload,
      };
    case APPROVE_POST_USER:
      return {
        ...state,
      };
    case TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.payload,
      };

    case TOTAL_DATES:
      return {
        ...state,
        dates: action.payload,
      };
    case TOTAL_USER_DATES:
      return {
        ...state,
        userDates: action.payload,
      };
    case BLOCK_USER:
      return {
        ...state,
      };
    case RESTORE_USER:
      return {
        ...state,
      };
    case DELETE_REPORT:
      return {
        ...state,
      };
      case "GET_USER_IMAGE2":
        let imagen2 = action.payload[0] ? action.payload[0].url : null;
      return {
        ...state,
        imageUser2: imagen2,
      };
      case "LIMPIAR_VIEW_USER":
        return {
          ...state,
          publicationsUser:[],
          favoritesUser:[],
          imageUser2:""
        }
    default:
      return state;
  }
}
