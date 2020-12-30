import { Reducer } from "app/store/redux";
import { ActionMap } from "app/store";

type NodeMap = Record<
  string,
  {
    password: string;
    address: string;
    port: string;
  }
>;

export type NodeAuth = {
  nodeMap: NodeMap;
  errorMessage: string;
  useAddresses: boolean;
  nodesResults: {
    success: string[];
    fail: string[];
  };
};

const initialState: NodeAuth = {
  nodeMap: {},
  errorMessage: "",
  useAddresses: false,
  nodesResults: {
    success: [],
    fail: [],
  },
};

const responseToNodeList = (
  response: ActionMap["NODE.AUTH.OK"]["payload"]["response"],
  { success }: { success: boolean },
) =>
  Object.entries(response.node_auth_error)
    .filter(([_n, r]) => r === (success ? 0 : 1))
    .map(([n]) => n);

const nodeAuth: Reducer<NodeAuth> = (state = initialState, action) => {
  switch (action.type) {
    case "NODE.AUTH.START":
      return {
        ...state,
        nodeMap: action.payload.initialNodeList.reduce<NodeMap>(
          (map, node): NodeMap => ({
            ...map,
            [node]: { password: "", address: "", port: "" },
          }),
          {},
        ),
      };
    case "NODE.AUTH.UPDATE.NODE": {
      const node = action.payload.nodeName;
      const stateNode = state.nodeMap[node];
      const { password, address, port } = action.payload.state;
      return {
        ...state,
        nodeMap: {
          ...state.nodeMap,
          [node]: {
            ...stateNode,
            password: password || stateNode.password,
            address: address || stateNode.address,
            port: port || stateNode.port,
          },
        },
      };
    }
    case "NODE.AUTH.ADDR.ENABLE": {
      if (action.payload.enable) {
        return { ...state, useAddresses: true };
      }
      return {
        ...state,
        useAddresses: false,
      };
    }
    case "NODE.AUTH.OK": {
      const { response } = action.payload;
      const failedNodes = responseToNodeList(response, { success: false });
      const successNodes = responseToNodeList(response, { success: true });
      return {
        ...state,
        errorMessage: "",
        nodeMap: failedNodes.reduce<NodeMap>(
          (map, node): NodeMap => ({
            ...map,
            [node]: {
              ...state.nodeMap[node],
              password: "",
            },
          }),
          {},
        ),
        nodesResults: {
          success: successNodes,
          fail: failedNodes,
        },
      };
    }
    case "NODE.AUTH.FAIL":
      return {
        ...state,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default nodeAuth;
