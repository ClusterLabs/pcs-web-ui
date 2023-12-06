import React from "react";
import {DropdownItem} from "@patternfly/react-core";
import {
  Dropdown,
  DropdownPosition,
  KebabToggle,
} from "@patternfly/react-core/deprecated";

import {testMarks} from "app/view/dataTest";
import {useDispatch} from "app/view/share/useDispatch";

const {drawer} = testMarks.notifications;

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
          onClick={() => dispatch({type: "NOTIFICATION.READ.ALL"})}
          {...drawer.markAllRead.mark}
        >
          Mark all read
        </DropdownItem>,

        <DropdownItem
          key="clearAll"
          onClick={() => dispatch({type: "NOTIFICATION.DESTROY.ALL"})}
          {...drawer.clearAll.mark}
        >
          Clear all
        </DropdownItem>,
      ]}
      id="notification-dropdown"
      position={DropdownPosition.right}
    />
  );
};
