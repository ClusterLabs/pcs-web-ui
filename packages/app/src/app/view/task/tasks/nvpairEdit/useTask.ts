import {ActionPayload, tools} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

const {labelize, getNVPairTypeLabel} = tools;

export const useTask = () => {
  const task = useTaskCommon("nvpairEdit");
  const {dispatch, state} = task;
  const {clusterName} = state;

  const key = {clusterName, task: task.name};
  const integerIsExpectedAsValue =
    state.owner.type === "node-utilization"
    || state.owner.type === "resource-utilization";

  const attrDesc = `${labelize(getNVPairTypeLabel(state.owner))} attribute`;
  const isCreate = state.type === "create";
  const label = `${isCreate ? "Create" : "Update"} ${attrDesc}`;

  return {
    ...task,
    clusterName,
    attrDesc,
    isCreate,
    label,
    integerIsExpectedAsValue,
    isValueValid: integerIsExpectedAsValue
      ? /^([1-9]\d*)$/.test(state.value)
      : state.value.length > 0,
    isNameValid: state.name.length > 0,
    isNameUsed: state.existingNameList.includes(state.name),

    updateState: (payload: ActionPayload["CLUSTER.NVPAIRS.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT.UPDATE",
        key,
        payload,
      }),

    attrSet: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.SAVE",
        key: {clusterName, task: task.name},
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
