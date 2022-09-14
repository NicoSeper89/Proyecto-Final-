const initialState = {

  detail:{}
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload
      }

      case "CLEAN":
        return{
          ...state,
          detail:{}
        }
    default:
      return state;
  }
}
