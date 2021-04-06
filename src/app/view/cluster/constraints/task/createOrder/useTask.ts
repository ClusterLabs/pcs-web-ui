import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintOrderCreate");
  const { clusterName, dispatch, state, close } = task;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  return {
    ...task,
    resourceIdList: clusterStatus.resourceTree.reduce<string[]>(
      (idList, resource) => {
        if (resource.itemType === "primitive") {
          return [...idList, resource.id];
        }

        if (resource.itemType === "group") {
          return [...idList, resource.id, ...resource.resources.map(r => r.id)];
        }

        return idList;
      },
      [],
    ),

    //actions
    updateState: (payload: ActionPayload["CONSTRAINT.ORDER.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    createOrder: () =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE",
        key: { clusterName },
        payload: {
          firstResourceId: state.firstResourceId,
          firstAction: state.firstAction,
          thenResourceId: state.thenResourceId,
          thenAction: state.thenAction,
        },
      }),

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.FAIL.RECOVER",
        key: { clusterName },
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    swapResources: () =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES",
        key: { clusterName },
      }),
  };
};
