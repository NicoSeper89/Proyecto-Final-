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
  LOADING,
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
  loading: false,
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
      console.log(action.payload, "action")
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
        ...state
    }
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
      console.log('entre a filter amb')
      if (action.payload === "") {
        let index = state.filters.property.findIndex(i => i.name === 'environments');
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
      } else {
        let index = state.filters.property.findIndex(i => i.name === 'environments');
        if (index > -1) {
          state.filters.property.splice(index, 1);
        }
        state.filters.property.push({ name: 'environments', value: parseInt(action.payload) });
      }
      return {
        ...state,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
