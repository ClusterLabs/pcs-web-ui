import { Reducer } from "app/store/redux";

import nodeAuth, { NodeAuth } from "./nodeAuth";

export type NodeAuthMap = Record<number, NodeAuth>;

const initialState: NodeAuthMap = {};

const nodeAuthMap: Reducer<NodeAuthMap> = (state = initialState, action) => {
  switch (action.type) {
    case "NODE.AUTH.START":
    case "NODE.AUTH.UPDATE.NODE":
      return {
        ...state,
        [action.payload.processId]: nodeAuth(
          state[action.payload.processId],
          action,
        ),
      };
    default:
      return state;
  }
};

export default nodeAuthMap;
