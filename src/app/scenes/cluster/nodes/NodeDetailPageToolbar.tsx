import React from "react";
import { ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { Action, types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  DetailLayoutToolbarDropdown,
  useClusterState,
  useSelectedClusterName,
} from "app/view";

export const NodeDetailPageToolbar: React.FC<{
  node: types.cluster.Node;
}> = ({ node }) => {
  const clusterUrlName = useSelectedClusterName();
  const { isNodeAttrCibTrue } = useClusterState(clusterUrlName);
  const standbyUnstandbyAction = (standby: boolean): Action => ({
    type: "LIB.CALL.CLUSTER",
    payload: {
      clusterUrlName,
      taskLabel: `standby node "${node.name}"`,
      call: {
        command: "node-standby-unstandby",
        payload: { standby, node_names: [node.name] },
      },
    },
  });
  const maintenanceUnmanintenanceAction = (maintenance: boolean): Action => ({
    type: "LIB.CALL.CLUSTER",
    payload: {
      clusterUrlName,
      taskLabel: `maintenance node "${node.name}"`,
      call: {
        command: "node-maintenance-unmaintenance",
        payload: {
          maintenance,
          node_names: [node.name],
        },
      },
    },
  });
  const standbyUnstandbyMenuItem: React.ComponentProps<
    typeof DetailLayoutToolbarDropdown
  >["menuItems"] = isNodeAttrCibTrue(node.name, "standby")
    ? {
        Unstandby: {
          confirm: {
            title: "Untandby node?",
            description: (
              <>
                Remove the node from standby mode. The node specified will now
                be able to to host resources
              </>
            ),
          },
          action: standbyUnstandbyAction(false),
        },
      }
    : {
        Standby: {
          confirm: {
            title: "Standby node?",
            description: (
              <>
                Put the node into standby mode. The node will no longer be able
                to host resources
              </>
            ),
          },
          action: standbyUnstandbyAction(true),
        },
      };
  const maintenanceUnmanintenanceMenuItem: React.ComponentProps<
    typeof DetailLayoutToolbarDropdown
  >["menuItems"] = isNodeAttrCibTrue(node.name, "maintenance")
    ? {
        Unmaintenance: {
          confirm: {
            title: "Unmaintenance node?",
            description: "Remove the node into maintenance mode",
          },
          action: maintenanceUnmanintenanceAction(false),
        },
      }
    : {
        Maintenance: {
          confirm: {
            title: "Maintenance node?",
            description: "Put the node into maintenance mode",
          },
          action: maintenanceUnmanintenanceAction(true),
        },
      };

  return (
    <DetailLayoutToolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <DetailLayoutToolbarAction
            name="Start"
            title="Start node?"
            action={{
              type: "NODE.START",
              payload: { clusterUrlName, nodeName: node.name },
            }}
          >
            Start a cluster on the node
          </DetailLayoutToolbarAction>
        </ToolbarItem>
        <ToolbarItem>
          <DetailLayoutToolbarAction
            name="Stop"
            title="Stop node?"
            action={{
              type: "NODE.STOP",
              payload: { clusterUrlName, nodeName: node.name },
            }}
          >
            Stop a cluster on the node
          </DetailLayoutToolbarAction>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarItem>
        <DetailLayoutToolbarDropdown
          menuItems={{
            ...standbyUnstandbyMenuItem,
            ...maintenanceUnmanintenanceMenuItem,
            Remove: {
              action: {
                type: "LIB.CALL.CLUSTER",
                payload: {
                  clusterUrlName,
                  taskLabel: `remove node "${node.name}"`,
                  call: {
                    command: "cluster-remove-nodes",
                    payload: { node_list: [node.name] },
                  },
                },
              },
              confirm: {
                title: "Remove node?",
                description:
                  "Shutdown specified nodes and remove them from the cluster.",
              },
            },
          }}
        />
      </ToolbarItem>
    </DetailLayoutToolbar>
  );
};
