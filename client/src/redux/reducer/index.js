const initialState = {
  houses:[],
  detail:{}
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload
      }

      case "CLEAN":
        return{
          ...state,
          detail:{}
        }
        case "HOUSES":
          return{
          ...state,
          houses: action.payload
          }
    default:
      return state;
  }
}
