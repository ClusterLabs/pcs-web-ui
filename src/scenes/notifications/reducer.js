import * as constants from "./constants"

const defaultState = [];

export default function notifications(state=defaultState, action) {
  switch(action.type){
    case constants.CREATE_WAITING:
      return [...state, action.payload]
    case constants.DESTROY: return state.filter(n => n.id !== action.payload.id)
    case constants.TO_SUCCESS:
    case constants.TO_ERROR:
      return state.map(n => n.id === action.payload.id ? action.payload : n)
    default: return state
  }
}
