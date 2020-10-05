import React from "react";
import { ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { actions, types, utils } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  DetailLayoutToolbarDropdown,
  useClusterState,
  useSelectedClusterName,
} from "app/view";

const isNodeIn = (
  mode: "standby" | "maintenance",
  clusterStatus: types.cluster.ClusterStatus,
  nodeName: string,
) =>
  utils.isCibTrue(
    clusterStatus.nodeAttr[nodeName]?.find(attr => attr.name === mode)?.value
      ?? "",
  );

export const NodeDetailPageToolbar: React.FC<{
  node: types.cluster.Node;
}> = ({ node }) => {
  const clusterUrlName = useSelectedClusterName();
  const clusterStatus = useClusterState(clusterUrlName).cluster;
  const standbyUnstandbyAction = (standby: boolean): actions.Action => ({
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
  const maintenanceUnmanintenanceAction = (
    maintenance: boolean,
  ): actions.Action => ({
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
  >["menuItems"] = isNodeIn("standby", clusterStatus, node.name)
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
  >["menuItems"] = isNodeIn("maintenance", clusterStatus, node.name)
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
        action: maintenanceUnmanintenanceAction(false),
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
          }}
        />
      </ToolbarItem>
    </DetailLayoutToolbar>
  );
};
