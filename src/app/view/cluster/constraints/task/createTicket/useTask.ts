import React from "react";

import {ActionPayload} from "app/store";
import {useClusterTask} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

export const useTask = () => {
  const task = useClusterTask("constraintTicketCreate");

  const {clusterName, dispatch, state, close} = task;
  const [{resourceTree, nodeList}] = useLoadedCluster();

  const updateState = React.useCallback(
    (payload: ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.TICKET.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),
    [dispatch, clusterName],
  );

  const resourceIdList = resourceTree.reduce<string[]>((idList, resource) => {
    if (resource.itemType === "primitive") {
      return [...idList, resource.id];
    }

    if (resource.itemType === "group") {
      return [...idList, resource.id, ...resource.resources.map(r => r.id)];
    }

    return idList;
  }, []);

  const isCustomIdValid = !state.useCustomId || state.id.length > 0;
  const isTicketValid = state.ticket.length > 0;
  const isResourceValid = state.resourceId.length > 0;
  return {
    ...task,
    isResourceValid,
    nodeNameList: nodeList.map(n => n.name),
    isCustomIdValid,
    isTicketValid,
    resourceIdList,

    // actions
    updateState,

    createTicket: ({force}: {force: boolean}) => {
      if (!isCustomIdValid || !isTicketValid || !isResourceValid) {
        dispatch({
          type: "TASK.VALIDATION.SHOW",
          key: {clusterName, task: task.name},
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

    recoverFromError: () => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET",
        key: {clusterName, task: task.name},
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
