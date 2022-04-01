import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("nvpairEdit");
  const { dispatch, clusterName, state } = task;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  let existingNames: string[] = [];
  if (state.owner !== null) {
    if (state.owner.type === "node-utilization") {
      if (state.owner.id in clusterStatus.nodesUtilization) {
        existingNames = clusterStatus.nodesUtilization[state.owner.id].map(
          utilization => utilization.name,
        );
      }
    } else {
      clusterStatus.resourceTree.forEach((r) => {
        if (r.itemType === "primitive" && r.id === state.owner.id) {
          existingNames = r.utilization.map(u => u.name);
        }
        if (
          r.itemType === "clone"
          && r.member.itemType === "primitive"
          && r.member.id === state.owner.id
        ) {
          existingNames = r.member.utilization.map(u => u.name);
        }

        if (r.itemType === "group") {
          r.resources.forEach((gr) => {
            if (gr.itemType === "primitive" && gr.id === state.owner.id) {
              existingNames = gr.utilization.map(u => u.name);
            }
          });
        }

        if (r.itemType === "clone" && r.member.itemType === "group") {
          r.member.resources.forEach((gr) => {
            if (gr.itemType === "primitive" && gr.id === state.owner.id) {
              existingNames = gr.utilization.map(u => u.name);
            }
          });
        }
      });
    }
  }

  const key = { clusterName, task: task.name };
  return {
    ...task,
    isValueValid: /^([1-9]\d*)$/.test(state.value),
    isNameValid: state.name.length > 0,
    isNameUsed: existingNames.includes(state.name),

    open: (payload: ActionPayload["CLUSTER.NVPAIRS.EDIT"]) => {
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT",
        key,
        payload,
      });
      task.open();
    },

    updateState: (payload: ActionPayload["CLUSTER.NVPAIRS.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT.UPDATE",
        key,
        payload,
      }),

    attrSet: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.SAVE",
        key: { clusterName, task: task.name },
        payload: {
          owner: state.owner,
          name: state.name,
          value: state.value,
        },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.SAVE.ERROR.RECOVER",
        key,
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT.CLOSE",
        key,
      });
      task.close();
    },
  };
};
