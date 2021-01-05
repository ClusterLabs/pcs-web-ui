import { Reducer } from "app/store/redux";

import nodeAuth, { NodeAuth } from "./nodeAuth";

export type NodeAuthMap = Record<number, NodeAuth>;

const initialState: NodeAuthMap = {};

const nodeAuthMap: Reducer<NodeAuthMap> = (state = initialState, action) => {
  switch (action.type) {
    case "NODE.AUTH.START":
      return {
        ...state,
        [action.id.process]: nodeAuth(state[action.id.process], action),
      };

    case "NODE.AUTH.STOP":
      return Object.keys(state)
        .map(Number)
        .reduce<NodeAuthMap>(
          (newState, key) => ({
            ...newState,
            ...(key !== action.id.process ? { [key]: state[key] } : {}),
          }),
          {},
        );

    default:
      if (
        "id" in action
        && "process" in action.id
        && action.id.process in state
      ) {
        return {
          ...state,
          [action.id.process]: nodeAuth(state[action.id.process], action),
        };
      }
      return state;
  }
};

export default nodeAuthMap;
