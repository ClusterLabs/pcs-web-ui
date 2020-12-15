import { Reducer } from "app/store/redux";
export type AuthNode = {
  nodeMap: Record<
    string,
    {
      password: string;
      address: string;
      port: string;
    }
  >;
};

const initialState: AuthNode = {
  nodeMap: {},
};

const authNode: Reducer<AuthNode> = (state = initialState, action) => {
  switch (action.type) {
    case "NODE.AUTH.START":
      return {
        ...state,
        nodeMap: action.payload.initialNodeList.reduce(
          (map, node) => ({
            ...map,
            [node]: { password: "", address: "", port: "" },
          }),
          {},
        ),
      };
    case "NODE.AUTH.UPDATE.NODE": {
      const nodeName = action.payload.nodeName;
      const stateNode = state.nodeMap[nodeName];
      const { password, address, port } = action.payload.state;
      return {
        ...state,
        nodeMap: {
          ...state.nodeMap,
          [nodeName]: {
            password: password || stateNode.password,
            address: address || stateNode.address,
            port: port || stateNode.address,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default authNode;
