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

  const cloneUncloneMenuItem: React.ComponentProps<
    typeof DetailLayoutToolbarDropdown
  >["menuItems"] = primitive.inClone
    ? {
        Unclone: {
          confirm: {
            title: "Unclone resource?",
            description: (
              <>
                Remove the clone which contains the resource (the resource will
                not be removed).
              </>
            ),
          },
          action: {
            type: "RESOURCE.UNCLONE",
            payload: {
              clusterUrlName,
              resourceId: primitive.id,
            },
          },
        },
      }
    : {
        Clone: {
          confirm: {
            title: "Clone resource?",
            description: "Set up the specified resource or group as a clone.",
          },
          action: {
            type: "RESOURCE.CLONE",
            payload: {
              clusterUrlName,
              resourceId: primitive.id,
            },
          },
        },
      };
  return (
    <DetailLayoutToolbar>
      <ToolbarGroup>
        <ToolbarItem>
          {isManaged && (
            <DetailLayoutToolbarAction
              name="Unmanage"
              title="Unmanage resource?"
              action={{
                type: "LIB.CALL.CLUSTER",
                payload: {
                  clusterUrlName,
                  taskLabel: `unmanage "${primitive.id}"`,
                  call: {
                    command: "resource-unmanage",
                    payload: { resource_or_tag_ids: [primitive.id] },
                  },
                },
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
                type: "LIB.CALL.CLUSTER",
                payload: {
                  clusterUrlName,
                  taskLabel: `manage "${primitive.id}"`,
                  call: {
                    command: "resource-manage",
                    payload: { resource_or_tag_ids: [primitive.id] },
                  },
                },
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
                type: "LIB.CALL.CLUSTER",
                payload: {
                  clusterUrlName,
                  taskLabel: `disable "${primitive.id}"`,
                  call: {
                    command: "resource-disable",
                    payload: { resource_or_tag_ids: [primitive.id] },
                  },
                },
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
                type: "LIB.CALL.CLUSTER",
                payload: {
                  clusterUrlName,
                  taskLabel: `enable "${primitive.id}"`,
                  call: {
                    command: "resource-enable",
                    payload: { resource_or_tag_ids: [primitive.id] },
                  },
                },
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
                type: "RESOURCE.REFRESH",
                payload: {
                  resourceId: primitive.id,
                  clusterUrlName,
                  resourceType: "resource",
                },
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
                type: "RESOURCE.CLEANUP",
                payload: {
                  resourceId: primitive.id,
                  clusterUrlName,
                  resourceType: "resource",
                },
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
            ...cloneUncloneMenuItem,
            Delete: {
              action: {
                type: "RESOURCE.DELETE",
                payload: {
                  resourceIds: [primitive.id],
                  clusterUrlName,
                  resourceType: "resource",
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
