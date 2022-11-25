import {ActionPayload} from "app/store";
import {useClusterTask} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {selectTopLevelPrimitives} from "app/view/cluster/resources/select";

export const useTask = () => {
  const task = useClusterTask("resourceGroup");

  const {clusterName, dispatch} = task;
  const [topLevelPrimitives] = useLoadedCluster(selectTopLevelPrimitives);

  const {
    state: {resourceIdList, groupId},
  } = task;

  const availableResources = topLevelPrimitives.filter(
    p => !resourceIdList.includes(p),
  );

  return {
    ...task,
    close: () => {
      task.close();
      dispatch({
        type: "RESOURCE.GROUP.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    availableResources,

    // actions
    updateState: (payload: ActionPayload["RESOURCE.GROUP.CREATE.UPDATE"]) =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE.UPDATE",
        key: {clusterName: clusterName},
        payload,
      }),

    createGroup: () =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE",
        key: {clusterName: clusterName},
        payload: {
          resourceIdList: resourceIdList,
          groupId: groupId,
        },
      }),
  };
};
