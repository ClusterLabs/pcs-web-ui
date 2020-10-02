import React from "react";
import { ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  DetailLayoutToolbarDropdown,
  useSelectedClusterName,
} from "app/view";

export const NodeDetailPageToolbar: React.FC<{
  node: types.cluster.Node;
}> = ({ node }) => {
  const clusterUrlName = useSelectedClusterName();
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
            Standby: {
              confirm: {
                title: "Standby node?",
                description: (
                  <>
                    Put the node into standby mode. The node specified will no
                    longer be able to host resources
                  </>
                ),
              },
              action: {
                type: "NODE.STANDBY",
                payload: { clusterUrlName, nodeName: node.name },
              },
            },
            Maintenance: {
              confirm: {
                title: "Maintenance node?",
                description: "Put the node into maintenance mode",
              },
              action: {
                type: "NODE.STANDBY",
                payload: { clusterUrlName, nodeName: node.name },
              },
            },
          }}
        />
      </ToolbarItem>
    </DetailLayoutToolbar>
  );
};
