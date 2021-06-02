import React from "react";

import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintTicketCreate");

  const { clusterName, dispatch, state, close } = task;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  const updateState = React.useCallback(
    (payload: ActionPayload["CONSTRAINT.TICKET.CREATE.UPDATE"]) =>
      dispatch({
        type: "CONSTRAINT.TICKET.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),
    [dispatch, clusterName],
  );

  const resourceIdList = clusterStatus.resourceTree.reduce<string[]>(
    (idList, resource) => {
      if (resource.itemType === "primitive") {
        return [...idList, resource.id];
      }

      if (resource.itemType === "group") {
        return [...idList, resource.id, ...resource.resources.map(r => r.id)];
      }

      return idList;
    },
    [],
  );

  React.useEffect(() => {
    const update: { resourceId?: string } = {};

    if (state.resourceId === "") {
      update.resourceId = resourceIdList[0];
    }

    if ("resourceId" in update) {
      updateState(update);
    }
  }, [updateState, resourceIdList, state.resourceId]);

  const isCustomIdValid = !state.useCustomId || state.id.length > 0;
  const isTicketValid = state.ticket.length > 0;
  return {
    ...task,
    nodeNameList: clusterStatus.nodeList.map(n => n.name),
    isCustomIdValid,
    isTicketValid,
    resourceIdList,

    // actions
    updateState,

    createTicket: ({ force }: { force: boolean }) => {
      if (!isCustomIdValid || !isTicketValid) {
        dispatch({
          type: "CLUSTER.TASK.VALIDATION.SHOW",
          key: { clusterName },
        });
        return;
      }
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "create constraint ticket set",
          call: {
            name: "constraint-ticket-create",
            payload: {
              resource_id: state.resourceId,
              ticket_key: state.ticket,
              options: {
                ...(state.useCustomId ? { id: state.id } : {}),
                ...(state.role !== "no limitation" ? { role: state.role } : {}),
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
        key: { clusterName, task: task.name },
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.TICKET.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
