import {ActionPayload} from "app/store";
import {isValidScore} from "app/view/share";
import {useTask as useTaskCommon} from "app/view/share";

export const useTask = () => {
  const task = useTaskCommon("constraintOrderCreate");
  const {dispatch, state, close} = task;
  const {clusterName} = state;

  return {
    ...task,
    clusterName,
    label: "Create order constraint",
    isFirstResourceValid: state.firstResourceId.length > 0,
    isThenResourceValid: state.thenResourceId.length > 0,
    isScoreValid: state.score.length === 0 || isValidScore(state.score),

    //actions
    updateState: (payload: ActionPayload["CONSTRAINT.ORDER.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),

    createOrder: () =>
      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE",
        key: {clusterName, task: task.name},
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
        key: {clusterName, task: task.name},
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    swapResources: () =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES",
        key: {clusterName},
      }),
  };
};
