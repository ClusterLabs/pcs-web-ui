import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

type OpenPayload = ActionPayload["RESOURCE.EDIT_ATTRS.OPEN"];

const prepareAttributes = (
  originalResourceAttrs: OpenPayload["resourceAttrs"],
  resourceAttrs: OpenPayload["resourceAttrs"],
) => {
  const changed = Object.entries(resourceAttrs).reduce(
    (changedAttrs, [name, value]) => {
      if (
        !(name in originalResourceAttrs) ||
        value !== originalResourceAttrs[name]
      ) {
        return {...changedAttrs, [name]: value};
      }
      return changedAttrs;
    },
    {},
  );

  const removed = Object.entries(originalResourceAttrs).reduce(
    (removedAttrs, [name, value]) => {
      if (value !== "" && name in resourceAttrs === false) {
        return {...removedAttrs, [name]: ""};
      }
      return removedAttrs;
    },
    {},
  );

  return {...changed, ...removed};
};

export const useTask = () => {
  const task = useTaskCommon("primitiveAttrsEdit");
  const {dispatch, state} = task;
  const {clusterName} = state;
  const key = {clusterName};

  return {
    ...task,
    clusterName,

    update: (name: string, value: string) =>
      dispatch({
        type: "RESOURCE.EDIT_ATTRS.UPDATE",
        key,
        payload: {
          name,
          value,
        },
      }),

    runUpdate: () =>
      dispatch({
        type: "RESOURCE.EDIT_ATTRS.RUN",
        key,
        payload: {
          resourceId: state.resourceId,
          attributes: prepareAttributes(
            state.originalResourceAttrs,
            state.resourceAttrs,
          ),
        },
      }),
    recoverFromError: () =>
      dispatch({
        type: "RESOURCE.EDIT_ATTRS.RUN.ERROR.RECOVER",
        key,
      }),
  };
};
