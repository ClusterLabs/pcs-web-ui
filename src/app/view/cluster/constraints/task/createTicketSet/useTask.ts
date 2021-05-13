import { ActionPayload } from "app/store";
import { useClusterTask, useResourceSets } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintTicketSetCreate");
  const { clusterName, dispatch, state, close } = task;

  return {
    ...task,
    ...useResourceSets("constraintTicketSetCreate"),

    isCustomIdValid: !state.useCustomId || state.id.length > 0,

    areSetsValid:
      (state.sets.length > 1
        && state.sets.every(s => s.resources.length > 0))
      || state.sets[0].resources.length > 1,

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.TICKET.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),
    updateSet: (index: number) => (
      set: ActionPayload["CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET"]["set"],
    ) => {
      dispatch({
        type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET",
        key: { clusterName },
        payload: { index, set },
      });
    },

    create: ({ force }: { force: boolean }) =>
      dispatch({
        type: "CONSTRAINT.TICKET.SET.CREATE",
        key: { clusterName },
        payload: {
          useCustomId: state.useCustomId,
          id: state.id,
          lossPolicy: state.lossPolicy,
          sets: state.sets,
          force,
        },
      }),

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.TICKET.SET.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
