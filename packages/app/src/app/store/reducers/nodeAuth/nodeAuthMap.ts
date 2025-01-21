import type {AppReducer} from "app/store/reducers/appReducer";

import {nodeAuth} from "./nodeAuth";

const initialState: Record<number, ReturnType<typeof nodeAuth>> = {};

export const nodeAuthMap: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.AUTH.START":
      return {
        ...state,
        [action.key.process]: nodeAuth(state[action.key.process], action),
      };

    case "NODE.AUTH.STOP":
      return Object.keys(state)
        .map(Number)
        .reduce<typeof initialState>(
          (newState, key) => ({
            ...newState,
            ...(key !== action.key.process ? {[key]: state[key]} : {}),
          }),
          {},
        );

    default:
      if (
        "key" in action &&
        "process" in action.key &&
        action.key.process in state
      ) {
        return {
          ...state,
          [action.key.process]: nodeAuth(state[action.key.process], action),
        };
      }
      return state;
  }
};
