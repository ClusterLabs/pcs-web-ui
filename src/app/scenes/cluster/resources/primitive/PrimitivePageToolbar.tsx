import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { DetailLayoutToolbar } from "app/view";

export const PrimitivePageToolbar: React.FC = () => {
  const [kebabIsOpen, setKebabIsOpen] = React.useState(false);
  return (
    <DetailLayoutToolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Button variant="secondary" aria-label="manage resource">
            Manage
          </Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button variant="secondary" aria-label="disable resource">
            Disable
          </Button>
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
