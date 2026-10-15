import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("primitiveGroupChange");
  const {dispatch, state} = task;
  const candidateGroupsIds = state.groupIdStructureList
    .map(g => g.id)
    .filter(id => id !== state.oldGroupId);

  const isSetForRemove =
    state.action === "remove-group" && state.oldGroupId !== "";

  return {
    ...task,
    isGroupValid: state.groupId.length > 0 || isSetForRemove,
    isAdjacentResourceValid:
      state.adjacentResourceId.length > 0 || isSetForRemove,
    candidateGroupsIds,
    memberResourcesIds:
      state.groupIdStructureList
        .find(g => g.id === state.groupId)
        ?.resources.map(r => r.id) ?? [],

    //actions
    updateState: (payload: ActionPayload["RESOURCE.GROUP.CHANGE.UPDATE"]) => {
      dispatch({type: "RESOURCE.GROUP.CHANGE.UPDATE", payload});
    },

    changeGroup: () =>
      dispatch({
        type: "RESOURCE.GROUP.CHANGE",
        payload: {
          resourceId: state.resourceId,
          groupId: !isSetForRemove ? state.groupId : "",
          oldGroupId: state.oldGroupId,
          position: state.position,
          adjacentResourceId: state.adjacentResourceId,
        },
      }),

    recoverFromError: () =>
      dispatch({type: "RESOURCE.GROUP.CHANGE.FAIL.RECOVER"}),

    close: () => {
      dispatch({type: "RESOURCE.GROUP.CHANGE.CLOSE"});
      task.close();
    },
  };
};
