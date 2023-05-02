import {ActionPayload} from "app/store";
import {isValidScore, prepareScore, useResourceSets} from "app/view/share";
import {useClusterTask} from "app/view/cluster/share";

type TrueFalse = "true" | "false";

export const useTask = () => {
  const task = useClusterTask("constraintColocationSetCreate");
  const {clusterName, dispatch, state, close} = task;

  const resourceSets = useResourceSets(clusterName, task.name);

  return {
    ...task,
    ...resourceSets,

    areSetsValid: resourceSets.areSetsValid(state.sets),

    isCustomIdValid: !state.useCustomId || state.id.length > 0,
    isScoreValid: state.score.length === 0 || isValidScore(state.score),

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),

    updateSet:
      (index: number) =>
      (
        set: ActionPayload["CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET"]["set"],
      ) => {
        dispatch({
          type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET",
          key: {clusterName},
          payload: {index, set},
        });
      },

    create: ({force}: {force: boolean}) => {
      const score = prepareScore({
        score: state.score,
        isNegative: state.placement === "apart",
      });
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "create constraint colocation set",
          call: {
            name: "constraint-colocation-create-with-set",
            payload: {
              constraint_options: {
                id: state.useCustomId ? state.id : undefined,
                ...(score.length > 0 ? {score} : {}),
              },
              resource_set_list: state.sets.map(set => ({
                ids: set.resources,
                options: {
                  ...(set.role !== "no limitation" ? {role: set.role} : {}),
                  sequential: (set.sequential ? "true" : "false") as TrueFalse,
                },
              })),
              resource_in_clone_alowed: force,
              duplication_alowed: force,
            },
          },
        },
      });
    },

    close: () => {
      close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE",
        key: {clusterName},
      });
    },
  };
};
