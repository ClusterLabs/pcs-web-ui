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

export const PrimitivePageToolbar: React.FC<{
  primitive: types.cluster.Primitive;
}> = ({ primitive }) => {
  const [kebabIsOpen, setKebabIsOpen] = React.useState(false);
  const clusterUrlName = useSelectedClusterName();
  return (
    <DetailLayoutToolbar>
      <ToolbarGroup>
        <ToolbarItem>
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
            {` "${primitive.id}"`}
          </DetailLayoutToolbarAction>
        </ToolbarItem>
        <ToolbarItem>
          <DetailLayoutToolbarAction
            name="Disable"
            title="Disable resource?"
            confirmationLabel="Disable"
            action={{
              type: "RESOURCE.PRIMITIVE.DISABLE",
              payload: { resourceNameList: [primitive.id], clusterUrlName },
            }}
          >
            {`This forces resource "${primitive.id}" to be stopped?`}
          </DetailLayoutToolbarAction>
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
