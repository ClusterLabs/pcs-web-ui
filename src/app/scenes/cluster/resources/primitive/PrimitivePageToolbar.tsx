import React from "react";
import {
  Dropdown,
  DropdownItem,
  KebabToggle,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { types } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
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
  const [kebabIsOpen, setKebabIsOpen] = React.useState(false);
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
              confirmationLabel="Unmanage"
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
              confirmationLabel="Manage"
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
              confirmationLabel="Disable"
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
              confirmationLabel="Enable"
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
        <Dropdown
          toggle={<KebabToggle onToggle={() => setKebabIsOpen(!kebabIsOpen)} />}
          isOpen={kebabIsOpen}
          isPlain
          dropdownItems={[
            <DropdownItem key="refresh" component="button">
              Refresh
            </DropdownItem>,
            <DropdownItem key="cleanup" component="button">
              Cleanup
            </DropdownItem>,
            <DropdownItem key="remove" component="button">
              Remove
            </DropdownItem>,
          ]}
        />
      </ToolbarItem>
    </DetailLayoutToolbar>
  );
};
