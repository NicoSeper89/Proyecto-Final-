import {
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_DETAIL,
  GET_DETAILS,
  GET_CITIES,
  GET_SERVICES,
  GET_PROPERTY_TYPES,
  CLEAN,
  FILTER_PROP
} from "../actions";

const initialState = {
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
    case FILTER_PROP:
      if(action.payload==='Propiedad'){
        state.filters.typeOfProp=''
      }else{
        state.filters.typeOfProp=action.payload
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
