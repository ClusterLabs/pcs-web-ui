import * as types from "./constants"

const defaultState = [];

export default function notifications(state=defaultState, action) {
  switch(action.type){
    case types.CREATE_WAITING:
      return [...state, action.payload]
    case types.DESTROY: return state.filter(n => n.id !== action.payload.id)
    case types.TO_SUCCESS:
    case types.TO_ERROR:
      return state.map(n => n.id === action.payload.id ? action.payload : n)
    default: return state
  }
}
