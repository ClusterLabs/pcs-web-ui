import React from "react";
import { ActionListItem, Dropdown, DropdownItem, KebabToggle } from "@patternfly/react-core";

export const PermissionMenu: React.FC<{ permissionName: string }> = ({
    permissionName,
  }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const dropdownItems = [
    <DropdownItem
      key="confirmation"
      component="button"
      data-test="edit permission"
    >
      {`Edit ${permissionName}`}
    </DropdownItem>,
    <DropdownItem
    key="confirmation"
    component="button"
    data-test="remove permission"
  >
    {`Remove ${permissionName}`}
  </DropdownItem>,
  ];
  
  return (
    <ActionListItem>
        <Dropdown
          isOpen={isOpen}
          onSelect={() => setIsOpen(!isOpen)}
          toggle={<KebabToggle onToggle={() => setIsOpen(!isOpen)} />}
          isPlain
          dropdownItems={dropdownItems}
          position="right"
        />
    </ActionListItem>  
  );
};
