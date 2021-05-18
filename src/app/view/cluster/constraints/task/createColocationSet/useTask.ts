import { ActionPayload } from "app/store";
import { useClusterTask, useResourceSets } from "app/view/share";

type TrueFalse = "true" | "false";

export const useTask = () => {
  const task = useClusterTask("constraintColocationSetCreate");
  const { clusterName, dispatch, state, close } = task;

  return {
    ...task,
    ...useResourceSets(task.name),

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

    create: ({ force }: { force: boolean }) =>
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "create constraint colocation set",
          call: {
            name: "constraint-colocation-create-with-set",
            payload: {
              constraint_options: {
                id: state.useCustomId ? state.id : undefined,
                score: state.score,
              },
              resource_set_list: state.sets.map(set => ({
                ids: set.resources,
                options: {
                  ...(set.role !== "no limitation" ? { role: set.role } : {}),
                  sequential: (set.sequential ? "true" : "false") as TrueFalse,
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
        key: { clusterName, task: task.name },
      });
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
