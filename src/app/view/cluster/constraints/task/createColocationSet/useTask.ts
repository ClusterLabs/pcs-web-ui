import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintColocationSetCreate");
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
      payload: ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    updateSet: (index: number) => (
      set: ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET"]["set"],
    ) => {
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET",
        key: { clusterName },
        payload: { index, set },
      });
    },

    createSet: () =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.CREATE.SET",
        key: { clusterName },
      }),

    deleteSet: (index: number) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.DELETE.SET",
        key: { clusterName },
        payload: {
          index,
        },
      }),

    moveSet: (
      index: number,
      direction: ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.MOVE.SET"]["direction"],
    ) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.MOVE.SET",
        key: { clusterName },
        payload: {
          index,
          direction,
        },
      }),

    create: ({ force }: { force: boolean }) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE",
        key: { clusterName },
        payload: {
          useCustomId: state.useCustomId,
          id: state.id,
          score: state.score,
          sets: state.sets,
          force,
        },
      }),

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
