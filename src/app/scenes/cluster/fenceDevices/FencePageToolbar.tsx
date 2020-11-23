import React from "react";
import { ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  DetailLayoutToolbarDropdown,
  useSelectedClusterName,
} from "app/view";

type FenceDevice = types.cluster.FenceDevice;

export const FencePageToolbar: React.FC<{ fenceDevice: FenceDevice }> = ({
  fenceDevice,
}) => {
  const clusterUrlName = useSelectedClusterName();
  return (
    <DetailLayoutToolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <DetailLayoutToolbarAction
            name="Refresh"
            title="Refresh fence device?"
            action={{
              type: "RESOURCE.REFRESH",
              payload: {
                resourceId: fenceDevice.id,
                clusterUrlName,
                resourceType: "fence-device",
              },
            }}
          >
            This makes the cluster forget the complete operation history
            (including failures) of the fence device and re-detects its current
            state.
          </DetailLayoutToolbarAction>
        </ToolbarItem>
        <ToolbarItem>
          <DetailLayoutToolbarAction
            name="Cleanup"
            title="Cleanup fence device?"
            action={{
              type: "RESOURCE.CLEANUP",
              payload: {
                resourceId: fenceDevice.id,
                clusterUrlName,
                resourceType: "fence-device",
              },
            }}
          >
            This makes the cluster forget failed operations from history of the
            fence device and re-detects its current state.
          </DetailLayoutToolbarAction>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarItem>
        <DetailLayoutToolbarDropdown
          menuItems={{
            Delete: {
              action: {
                type: "RESOURCE.DELETE",
                payload: {
                  resourceIds: [fenceDevice.id],
                  clusterUrlName,
                  resourceType: "fence-device",
                },
              },
              confirm: {
                title: "Delete resource?",
                description: <>This deletes the resource</>,
              },
            },
          }}
        />
      </ToolbarItem>
    </DetailLayoutToolbar>
  );
};
