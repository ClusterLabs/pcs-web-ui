import { useSelector } from "react-redux";

import { ActionMap, selectors, useDispatch } from "app/store";

export const useAuth = (processId: number) => {
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
        payload: {
          processId,
          nodeName,
          state,
        },
      }),

    nodeAuth: () =>
      dispatch({
        type: "NODE.AUTH",
        payload: {
          processId,
          nodeMap: state.nodeMap,
        },
      }),

    switchAddressUse: (enable: boolean) => {
      dispatch({
        type: "NODE.AUTH.ADDR.ENABLE",
        payload: {
          processId,
          enable,
        },
      });
    },
  };
};
