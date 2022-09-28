import {
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_DETAIL,
  GET_DETAILS,
  GET_CITIES,
  GET_SERVICES,
  GET_PROPERTY_TYPES,
  CLEAN,
  ULPOAD_IMG,
  FILTER_PROP,
  FILTER_AMB,
  FILTER_PET,
  SORT_PRICE,
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
  FAV_ID_LIST,
  GET_COMMENT,
  POST_COMMENT,
  REPORT_PUBLICATION,
  GET_ALL_PUBLICATIONS,
  GET_PUBLICATIONS_NAVAILABLE,
  GET_REPORTS,
  GET_REPORTS_ID,
  GET_FOR_APPROVAL,
  APPROVE_POST_USER

} from "../actions";

const initialState = {
  allUserInfo: [],
  infoUser: null,
  houses: [], //Todas las publicaciones
  housePrem: [], //Publicación Premium
  services: [],
  typeOfProperties: [],
  cities: [],
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
  favoritesUser: [], //favoritos de cada usuario
  favoritesUserId: [],
  imageUser: "",
  comments: [],
  reports:[],
  reportsId:[],
  forApproval:[]
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
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
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
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
    case SORT_PRICE:
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
      return {
        ...state,
        housePrem: action.payload,
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
    case DELETE_PUBLICACTION_IMAGE:
      return {
        ...state,
      };
    case SET_PUBLICATION:
      console.log("en setpub reducer", action.payload);
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
        publicationsUser: action.payload,
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
      console.log(action.payload);
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
        houses: action.payload
      }

    case GET_PUBLICATIONS_NAVAILABLE:
      const noAvailable = action.payload.filter(p => p.deleted)
      return {
        ...state,
        houses: noAvailable
      }
    case GET_REPORTS:

      return {
        ...state,
        reports:action.payload
      };
    case GET_REPORTS_ID:

      return {
        ...state,
        reportsId:action.payload
      };
    case GET_FOR_APPROVAL
      :
      return {
        ...state,
        forApproval:action.payload
      };
    case APPROVE_POST_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
