import React from "react";
import { ToolbarGroup, ToolbarItem } from "@patternfly/react-core";

import { types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  DetailLayoutToolbarDropdown,
  useSelectedClusterName,
} from "app/view";

type Primitive = types.cluster.Primitive;

const isPrimitiveManaged = (primitive: Primitive) =>
  primitive.metaAttributes.every(
    metaAttribute =>
      metaAttribute.name !== "is-managed" || metaAttribute.value !== "false",
  );

const isPrimitiveEnabled = (primitive: Primitive) =>
  primitive.metaAttributes.every(
    metaAttribute =>
      metaAttribute.name !== "target-role" || metaAttribute.value !== "Stopped",
  );

export const PrimitivePageToolbar: React.FC<{
  primitive: Primitive;
}> = ({ primitive }) => {
  const clusterUrlName = useSelectedClusterName();
  const isManaged = isPrimitiveManaged(primitive);
  const isEnabled = isPrimitiveEnabled(primitive);
  return (
    <DetailLayoutToolbar>
      <ToolbarGroup>
        <ToolbarItem>
          {isManaged && (
            <DetailLayoutToolbarAction
              name="Unmanage"
              title="Unmanage resource?"
              action={{
                type: "RESOURCE.PRIMITIVE.UNMANAGE",
                payload: { resourceNameList: [primitive.id], clusterUrlName },
              }}
            >
              This disallows the cluster to start and stop the resource
            </DetailLayoutToolbarAction>
          )}
          {!isManaged && (
            <DetailLayoutToolbarAction
              name="Manage"
              title="Manage resource?"
              action={{
                type: "RESOURCE.PRIMITIVE.MANAGE",
                payload: { resourceNameList: [primitive.id], clusterUrlName },
              }}
            >
              This allows the cluster to start and stop the resource
            </DetailLayoutToolbarAction>
          )}
        </ToolbarItem>
        <ToolbarItem>
          {isEnabled && (
            <DetailLayoutToolbarAction
              name="Disable"
              title="Disable resource?"
              action={{
                type: "RESOURCE.PRIMITIVE.DISABLE",
                payload: { resourceNameList: [primitive.id], clusterUrlName },
              }}
            >
              This attempts to stop the resource if they are running and forbid
              the cluster from starting it again.
            </DetailLayoutToolbarAction>
          )}
          {!isEnabled && (
            <DetailLayoutToolbarAction
              name="Enable"
              title="Enable resource?"
              action={{
                type: "RESOURCE.PRIMITIVE.ENABLE",
                payload: { resourceNameList: [primitive.id], clusterUrlName },
              }}
            >
              This allows the cluster to start the resource
            </DetailLayoutToolbarAction>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarItem>
        <DetailLayoutToolbarDropdown
          menuItems={{
            Refresh: {
              action: {
                type: "RESOURCE.PRIMITIVE.REFRESH",
                payload: { resourceId: primitive.id, clusterUrlName },
              },
              confirm: {
                title: "Refresh resource?",
                description: (
                  <>
                    This makes the cluster forget the complete operation history
                    (including failures) of the resource and re-detects its
                    current state.
                  </>
                ),
              },
            },
            Cleanup: {
              action: {
                type: "RESOURCE.PRIMITIVE.CLEANUP",
                payload: { resourceId: primitive.id, clusterUrlName },
              },
              confirm: {
                title: "Cleanup resource?",
                description: (
                  <>
                    This makes the cluster forget failed operations from history
                    of the resource and re-detects its current state.
                  </>
                ),
              },
            },
            Delete: {
              action: {
                type: "RESOURCE.PRIMITIVE.DELETE",
                payload: { resourceIds: [primitive.id], clusterUrlName },
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
