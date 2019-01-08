import { GET_WASTES, SEARCH_WASTES } from "../actions/types";

const initialState = {
  wastes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WASTES:
      return { 
        ...state,
        wastes: action.payload
      }
    case SEARCH_WASTES:
      return { 
        ...state,
        wastes: action.payload
      }
    default:
      return state;
  }
}