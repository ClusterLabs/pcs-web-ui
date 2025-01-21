import type {ActionPayload} from "app/store";
import {isValidScore} from "app/view/share";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("constraintLocationCreate");

  const {dispatch, state, close} = task;
  const {clusterName} = state;

  return {
    ...task,
    clusterName,
    label: "Create location constraint",
    isScoreValid: state.score.length === 0 || isValidScore(state.score),
    isResourceValid:
      state.resourceSpecification === "pattern" || state.resourceId.length > 0,
    isPatternValid:
      state.resourceSpecification === "resource" ||
      state.resourcePattern.length > 0,
    isNodeValid:
      state.locationSpecification === "rule" || state.nodeName.length > 0,
    isRuleValid:
      state.locationSpecification === "node" || state.rule.length > 0,

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.LOCATION.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),

    createLocation: () => {
      const resourceSpecification = state.resourceSpecification;
      const resourceValue =
        resourceSpecification === "pattern"
          ? state.resourcePattern
          : state.resourceId;

      const score = `${state.preference === "prefer" ? "" : "-"}${state.score}`;
      const locationSpecification = state.locationSpecification;

      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE",
        key: {clusterName, task: task.name},
        payload:
          locationSpecification === "node"
            ? {
                locationSpecification,
                constraint: {
                  location: {
                    resourceSpecification,
                    resourceValue,
                    nodeName: state.nodeName,
                    score,
                  },
                },
              }
            : {
                locationSpecification,
                constraint: {
                  location: {
                    resourceSpecification,
                    resourceValue,
                    rule: state.rule,
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
        type: "CONSTRAINT.LOCATION.CREATE.CLOSE",
        key: {clusterName},
      });
    },
  };
};
