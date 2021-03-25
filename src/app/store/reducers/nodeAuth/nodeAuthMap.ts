import { Reducer } from "../tools";

import nodeAuth, { NodeAuth } from "./nodeAuth";

export type NodeAuthMap = Record<number, NodeAuth>;

const initialState: NodeAuthMap = {};

const nodeAuthMap: Reducer<NodeAuthMap> = (state = initialState, action) => {
  switch (action.type) {
    case "NODE.AUTH.START":
      return {
        ...state,
        [action.key.process]: nodeAuth(state[action.key.process], action),
      };

    case "NODE.AUTH.STOP":
      return Object.keys(state)
        .map(Number)
        .reduce<NodeAuthMap>(
          (newState, key) => ({
            ...newState,
            ...(key !== action.key.process ? { [key]: state[key] } : {}),
          }),
          {},
        );

    default:
      if (
        "key" in action
        && "process" in action.key
        && action.key.process in state
      ) {
        return {
          ...state,
          [action.key.process]: nodeAuth(state[action.key.process], action),
        };
      }
      return state;
  }
};

export default nodeAuthMap;
