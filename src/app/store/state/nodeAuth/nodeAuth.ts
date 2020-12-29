import { Reducer } from "app/store/redux";
export type NodeAuth = {
  nodeMap: Record<
    string,
    {
      password: string;
      address: string;
      port: string;
    }
  >;
  processStatus: "" | "success" | "error";
  errorMessage: string;
  useAddresses: boolean;
};

const initialState: NodeAuth = {
  nodeMap: {},
  processStatus: "",
  errorMessage: "",
  useAddresses: false,
};

const nodeAuth: Reducer<NodeAuth> = (state = initialState, action) => {
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
    case "NODE.AUTH.OK":
      return {
        ...state,
        processStatus: "success",
        errorMessage: "",
      };
    case "NODE.AUTH.FAIL":
      return {
        ...state,
        processStatus: "error",
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default nodeAuth;
