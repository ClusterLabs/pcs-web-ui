import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
} from "@patternfly/react-core";

import { useDispatch } from "app/view/share/useDispatch";

export const DrawerDropdown = () => {
  const [isHeaderDropdownOpen, setHeaderDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <Dropdown
      onSelect={() => setHeaderDropdownOpen(!isHeaderDropdownOpen)}
      toggle={
        <KebabToggle
          onToggle={() => setHeaderDropdownOpen(!isHeaderDropdownOpen)}
          id="notification-toggle"
        />
      }
      isOpen={isHeaderDropdownOpen}
      isPlain
      dropdownItems={[
        <DropdownItem
          key="markAllRead"
          onClick={() => dispatch({ type: "NOTIFICATION.READ.ALL" })}
        >
          Mark all read
        </DropdownItem>,

        <DropdownItem
          key="clearAll"
          onClick={() => dispatch({ type: "NOTIFICATION.DESTROY.ALL" })}
        >
          Clear all
        </DropdownItem>,
      ]}
      id="notification-dropdown"
      position={DropdownPosition.right}
    />
  );
};
