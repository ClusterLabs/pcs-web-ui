import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";
import { Primitive } from "app/view/cluster/types";

export const useTask = () => {
  const task = useClusterTask("primitiveGroupChange");
  const [groupList] = useClusterSelector(selectors.getGroups);
  const { dispatch, clusterName, state } = task;
  const groupIdList = groupList.map(g => g.id);
  const candidateGroupsIds = groupIdList.filter(g => g !== state.oldGroupId);

  const isSetForRemove =
    state.action === "remove-group" && state.oldGroupId !== "";

  return {
    ...task,
    isGroupValid: state.groupId.length > 0 || isSetForRemove,
    isAdjacentResourceValid:
      state.adjacentResourceId.length > 0 || isSetForRemove,
    canChange: (primitive: Primitive) =>
      primitive.inGroup !== null || groupList.length > 0,
    candidateGroupsIds,
    memberResourcesIds:
      groupList
        .find(g => g.id === state.groupId)
        ?.resources.map(r => r.id) ?? [],

    //actions
    updateState: (payload: ActionPayload["RESOURCE.GROUP.CHANGE.UPDATE"]) => {
      dispatch({
        type: "RESOURCE.GROUP.CHANGE.UPDATE",
        key: { clusterName },
        payload,
      });
    },

    changeGroup: () =>
      dispatch({
        type: "RESOURCE.GROUP.CHANGE",
        key: { clusterName },
        payload: {
          resourceId: state.resourceId,
          groupId: !isSetForRemove ? state.groupId : "",
          oldGroupId: state.oldGroupId,
          position: state.position,
          adjacentResourceId: state.adjacentResourceId,
        },
      }),

    recoverFromError: () =>
      dispatch({
        type: "RESOURCE.GROUP.CHANGE.FAIL.RECOVER",
        key: { clusterName },
      }),

    close: () => {
      dispatch({
        type: "RESOURCE.GROUP.CHANGE.CLOSE",
        key: { clusterName },
      });
      task.close();
    },

    open: (primitive: Primitive) => {
      dispatch({
        type: "RESOURCE.GROUP.CHANGE.UPDATE",
        key: { clusterName },
        payload: {
          resourceId: primitive.id,
          oldGroupId: primitive.inGroup ?? "",
          groupId: primitive.inGroup ?? "",
          action:
            primitive.inGroup !== null && primitive.inGroup !== ""
              ? "move-in-group"
              : "set-group",
        },
      });
      task.open();
    },
  };
};
