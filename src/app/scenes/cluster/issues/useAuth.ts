import { ActionMap, selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [state, clusterUrlName] = useClusterSelector(
    selectors.getAuthNodeState,
  );
  return {
    state,
    // actions
    start: (initialNodeList: string[]) =>
      dispatch({
        type: "NODE.AUTH.START",
        payload: {
          clusterUrlName,
          initialNodeList,
        },
      }),

    updateNode: (
      nodeName: string,
      state: ActionMap["NODE.AUTH.UPDATE.NODE"]["payload"]["state"],
    ) =>
      dispatch({
        type: "NODE.AUTH.UPDATE.NODE",
        payload: {
          clusterUrlName,
          nodeName,
          state,
        },
      }),

    nodeAuth: () =>
      dispatch({
        type: "NODE.AUTH",
        payload: {
          clusterUrlName,
          nodeMap: state.nodeMap,
        },
      }),
  };
};
