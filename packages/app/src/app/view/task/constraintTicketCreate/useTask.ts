import React from "react";

import type {ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("constraintTicketCreate");

  const {dispatch, state, close} = task;
  const {clusterName} = state;

  const updateState = React.useCallback(
    (payload: ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.TICKET.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),
    [dispatch, clusterName],
  );

  const isCustomIdValid = !state.useCustomId || state.id.length > 0;
  const isTicketValid = state.ticket.length > 0;
  const isResourceValid = state.resourceId.length > 0;
  return {
    ...task,
    clusterName,
    label: "Create ticket constraint",
    isResourceValid,
    isCustomIdValid,
    isTicketValid,

    // actions
    updateState,

    createTicket: ({force}: {force: boolean}) => {
      if (!isCustomIdValid || !isTicketValid || !isResourceValid) {
        dispatch({
          type: "TASK.VALIDATION.SHOW",
          key: {task: task.name},
        });
        return;
      }
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "create constraint ticket set",
          call: {
            name: "constraint-ticket-create",
            payload: {
              resource_id: state.resourceId,
              ticket_key: state.ticket,
              options: {
                ...(state.useCustomId ? {id: state.id} : {}),
                ...(state.role !== "no limitation"
                  ? {"rsc-role": state.role}
                  : {}),
                "loss-policy": state.lossPolicy,
              },
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
        type: "CONSTRAINT.TICKET.CREATE.CLOSE",
        key: {clusterName},
      });
    },
  };
};
