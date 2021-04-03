import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

export const useTask = () => {
  const clusterTask = useClusterTask("taskResourceGroup");

  const { clusterName, dispatch } = clusterTask;
  const [topLevelPrimitives] = useClusterSelector(
    selectors.getTopLevelPrimitives,
  );

  const {
    state: { resourceIdList, groupId },
  } = clusterTask;

  const availableResources = topLevelPrimitives.filter(
    p => !resourceIdList.includes(p),
  );

  return {
    ...clusterTask,
    close: () => {
      clusterTask.close();
      dispatch({
        type: "RESOURCE.GROUP.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    availableResources,

    // actions
    updateState: (payload: ActionPayload["RESOURCE.GROUP.CREATE.UPDATE"]) =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE.UPDATE",
        key: { clusterName: clusterName },
        payload,
      }),

    createGroup: () =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE",
        key: { clusterName: clusterName },
        payload: {
          resourceIdList: resourceIdList,
          groupId: groupId,
        },
      }),
  };
};
