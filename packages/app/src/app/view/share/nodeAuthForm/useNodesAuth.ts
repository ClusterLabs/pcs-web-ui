import {useSelector} from "react-redux";

import {type ActionPayload, selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";

export const useNodesAuth = (processId: number) => {
  const dispatch = useDispatch();
  const state = useSelector(selectors.getAuthNodeState(processId));
  return {
    state,
    // actions

    updateNode: (
      nodeName: string,
      state: ActionPayload["NODE.AUTH.UPDATE.NODE"]["state"],
    ) =>
      dispatch({
        type: "NODE.AUTH.UPDATE.NODE",
        key: {process: processId},
        payload: {
          nodeName,
          state,
        },
      }),

    nodeAuth: () => {
      let nodeMap: ActionPayload["NODE.AUTH"]["nodeMap"] = state.nodeMap;
      if (state.onePasswordForAll) {
        const nameList = Object.keys(state.nodeMap);

        const firstPassword =
          nameList.length > 0 ? state.nodeMap[nameList[0]].password : "";

        nodeMap = nameList.reduce(
          (map, name) => ({
            ...map,
            [name]: {
              ...state.nodeMap[name],
              password: firstPassword,
            },
          }),
          {},
        );
      }
      dispatch({
        type: "NODE.AUTH",
        key: {process: processId},
        payload: {nodeMap},
      });
    },

    switchAddressUse: (enable: boolean) => {
      dispatch({
        type: "NODE.AUTH.ADDR.ENABLE",
        key: {process: processId},
        payload: {enable},
      });
    },

    switchOnePasswordForAll: (enable: boolean) => {
      dispatch({
        type: "NODE.AUTH.ONE.PASSWORD.FOR.ALL.ENABLE",
        key: {process: processId},
        payload: {enable},
      });
    },
  };
};
