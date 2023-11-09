import React from "react";

import {ActionPayload} from "app/store";
import {isValidScore, prepareScore} from "app/view/share";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("constraintColocationCreate");

  const {dispatch, state, close} = task;
  const {clusterName} = state;

  const updateState = React.useCallback(
    (payload: ActionPayload["CONSTRAINT.COLOCATION.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),
    [dispatch, clusterName],
  );

  return {
    ...task,
    clusterName,
    label: "Create colocation constraint",
    isResourceValid: state.resourceId.length > 0,
    isWithResourceValid: state.withResourceId.length > 0,
    isScoreValid: state.score.length === 0 || isValidScore(state.score),

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
