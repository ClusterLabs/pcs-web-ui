import {ActionPayload} from "app/store";
import {useResourceSets} from "app/view/share";
import {useTask as useTaskCommon} from "app/view/share";

export const useTask = () => {
  const task = useTaskCommon("constraintTicketSetCreate");
  const {dispatch, state, close} = task;
  const {clusterName} = state;

  const resourceSets = useResourceSets(clusterName, task.name);

  return {
    ...task,
    clusterName,
    ...resourceSets,

    isCustomIdValid: !state.useCustomId || state.id.length > 0,
    isTicketValid: state.ticket.length > 0,

    areSetsValid: resourceSets.areSetsValid(state.sets),

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.TICKET.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),
    updateSet:
      (index: number) =>
      (
        set: ActionPayload["CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET"]["set"],
      ) => {
        dispatch({
          type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET",
          key: {clusterName},
          payload: {index, set},
        });
      },

    create: ({force}: {force: boolean}) =>
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "create constraint ticket set",
          call: {
            name: "constraint-ticket-create-with-set",
            payload: {
              constraint_options: {
                ticket: state.ticket,
                id: state.useCustomId ? state.id : undefined,
                "loss-policy": state.lossPolicy,
              },
              resource_set_list: state.sets.map(set => ({
                ids: set.resources,
                options: {
                  ...(set.role !== "no limitation" ? {role: set.role} : {}),
                },
              })),
              resource_in_clone_alowed: force,
              duplication_alowed: force,
            },
          },
        },
      }),

    close: () => {
      close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CONSTRAINT.TICKET.SET.CREATE.CLOSE",
        key: {clusterName},
      });
    },
  };
};
