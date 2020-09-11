import React from "react";
import {
  Dropdown,
  DropdownItem,
  KebabToggle,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { types } from "app/store";
import { DetailLayoutToolbar, DetailLayoutToolbarAction } from "app/view";

export const PrimitivePageToolbar: React.FC<{
  primitive: types.cluster.Primitive;
}> = ({ primitive }) => {
  const [kebabIsOpen, setKebabIsOpen] = React.useState(false);
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
              payload: { resourceNames: [primitive.id] },
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
              payload: { resourceNames: [primitive.id] },
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
