import { ActionPayload, selectors } from "app/store";
import {
  isValidScore,
  useClusterSelector,
  useClusterTask,
} from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintOrderCreate");
  const { clusterName, dispatch, state, close } = task;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  return {
    ...task,
    isFirstResourceValid: state.firstResourceId.length > 0,
    isThenResourceValid: state.thenResourceId.length > 0,
    isScoreValid: state.score.length === 0 || isValidScore(state.score),
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
        type: "CONSTRAINT.SINGLE.CREATE",
        key: { clusterName, task: task.name },
        payload: {
          constraint: {
            order: {
              resourceId: state.firstResourceId,
              action: state.firstAction,
              order: "after",
              otherResourceId: state.thenResourceId,
              otherAction: state.thenAction,
              score: state.score,
            },
          },
        },
      }),

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE.FAIL.RECOVER",
        key: { clusterName, task: task.name },
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
