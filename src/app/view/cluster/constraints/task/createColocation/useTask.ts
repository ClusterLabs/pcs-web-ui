import React from "react";

import {ActionPayload} from "app/store";
import {isValidScore, prepareScore, useClusterTask} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

export const useTask = () => {
  const task = useClusterTask("constraintColocationCreate");

  const {clusterName, dispatch, state, close} = task;
  const {resourceTree, nodeList} = useLoadedCluster();

  const updateState = React.useCallback(
    (payload: ActionPayload["CONSTRAINT.COLOCATION.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),
    [dispatch, clusterName],
  );

  const resourceIdList = resourceTree.reduce<string[]>((idList, resource) => {
    if (resource.itemType === "primitive") {
      return [...idList, resource.id];
    }

    if (resource.itemType === "group") {
      return [...idList, resource.id, ...resource.resources.map(r => r.id)];
    }

    return idList;
  }, []);

  return {
    ...task,
    isResourceValid: state.resourceId.length > 0,
    isWithResourceValid: state.withResourceId.length > 0,
    isScoreValid: state.score.length === 0 || isValidScore(state.score),
    nodeNameList: nodeList.map(n => n.name),
    resourceIdList,

    // actions
    updateState,

    createColocation: () => {
      const score = prepareScore({
        score: state.score,
        isNegative: state.placement === "apart",
      });
      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE",
        key: {clusterName, task: task.name},
        payload: {
          constraint: {
            colocation: {
              resourceId: state.resourceId,
              withResourceId: state.withResourceId,
              score,
            },
          },
        },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE.FAIL.RECOVER",
        key: {clusterName, task: task.name},
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.COLOCATION.CREATE.CLOSE",
        key: {clusterName},
      });
    },
  };
};
