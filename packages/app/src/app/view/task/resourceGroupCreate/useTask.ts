import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceGroup");

  const {
    dispatch,
    state: {clusterName, topLevelPrimitiveIds},
  } = task;

  const {
    state: {resourceIdList, groupId},
  } = task;

  const availableResources = topLevelPrimitiveIds.filter(
    p => !resourceIdList.includes(p),
  );

  return {
    ...task,
    clusterName,
    close: () => {
      task.close();
      dispatch({
        type: "RESOURCE.GROUP.CREATE.CLOSE",
      });
    },

    availableResources,

    // actions
    updateState: (payload: ActionPayload["RESOURCE.GROUP.CREATE.UPDATE"]) =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE.UPDATE",
        payload,
      }),

    createGroup: () =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE",
        payload: {
          resourceIdList: resourceIdList,
          groupId: groupId,
        },
      }),
  };
};
