import { useSelector } from "react-redux";

import { ActionMap, selectors, useDispatch } from "app/store";

export const useNodesAuth = (processId: number) => {
  const dispatch = useDispatch();
  const state = useSelector(selectors.getAuthNodeState(processId));
  return {
    state,
    // actions

    updateNode: (
      nodeName: string,
      state: ActionMap["NODE.AUTH.UPDATE.NODE"]["payload"]["state"],
    ) =>
      dispatch({
        type: "NODE.AUTH.UPDATE.NODE",
        key: { process: processId },
        payload: {
          nodeName,
          state,
        },
      }),

    nodeAuth: () =>
      dispatch({
        type: "NODE.AUTH",
        key: { process: processId },
        payload: { nodeMap: state.nodeMap },
      }),

    switchAddressUse: (enable: boolean) => {
      dispatch({
        type: "NODE.AUTH.ADDR.ENABLE",
        key: { process: processId },
        payload: { enable },
      });
    },
  };
};
