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
  VALUE_FILTER,
  SAVEFILTER,
  SAVESORT,
  DELETE_PUBLICACTION,
  DELETE_PUBLICACTION_IMAGE
} from "../actions";

const initialState = {
  infoUser:[],
  houses: [],
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
  currentPage: 1,
  valueFilter: "",
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
        //default action entonces limpia el filtro
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
      if (action.payload === "Precio") {
        state.sorting = { name: "default", direccion: "minMax" };
        return {
          ...state,
        };
      } else {
        state.sorting = { name: "price", direccion: action.payload };
        return {
          ...state,
        };
      }
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
    case VALUE_FILTER:
      return {
        ...state,
        valueFilter: action.payload,
      };
    case SAVEFILTER:
      return {
        ...state,
        filters: action.payload
      }
    case SAVESORT:
      return {
        ...state,
        sorting: action.payload
      }
     case DELETE_PUBLICACTION:
      return {
        ...state,
      } 
     case DELETE_PUBLICACTION_IMAGE:
      return {
        ...state,
      } 
    case "INFO_USER":
      return {
        ...state,
        infoUser: action.payload
      }
    default:
      return state;
  }
}