import { ActionPayload } from "app/store";
import { useClusterTask, useResourceSets } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintOrderSetCreate");
  const { clusterName, dispatch, state, close } = task;

  return {
    ...task,
    ...useResourceSets("constraintOrderSetCreate"),

    areSetsValid:
      (state.sets.length > 1
        && state.sets.every(s => s.resources.length > 0))
      || state.sets[0].resources.length > 1,

    isCustomIdValid: !state.useCustomId || state.id.length > 0,

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    updateSet: (index: number) => (
      set: ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET"]["set"],
    ) => {
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET",
        key: { clusterName },
        payload: { index, set },
      });
    },

    create: ({ force }: { force: boolean }) =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE",
        key: { clusterName },
        payload: {
          useCustomId: state.useCustomId,
          id: state.id,
          sets: state.sets,
          force,
        },
      }),

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
