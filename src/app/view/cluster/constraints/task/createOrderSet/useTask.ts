import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintOrderSetCreate");
  const { clusterName, dispatch, state, close } = task;

  return {
    ...task,

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

    createSet: () =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET",
        key: { clusterName },
      }),

    deleteSet: (index: number) =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET",
        key: { clusterName },
        payload: {
          index,
        },
      }),

    moveSet: (
      index: number,
      direction: ActionPayload["CONSTRAINT.ORDER.SET.CREATE.MOVE.SET"]["direction"],
    ) =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.MOVE.SET",
        key: { clusterName },
        payload: {
          index,
          direction,
        },
      }),

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
