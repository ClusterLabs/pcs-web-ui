import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

import {testMarks} from "app/view/dataTest";
import {useDispatch} from "app/view/share/useDispatch";

const {drawer} = testMarks.notifications;

export const DrawerDropdown = () => {
  const [isHeaderDropdownOpen, setHeaderDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <Dropdown
      onSelect={() => setHeaderDropdownOpen(false)}
      toggle={toggleRef => (
        <MenuToggle
          ref={toggleRef}
          id="notification-toggle"
          aria-label="notification menu toggle"
          variant="plain"
          onClick={() => setHeaderDropdownOpen(!isHeaderDropdownOpen)}
          isExpanded={isHeaderDropdownOpen}
        >
          <EllipsisVIcon />
        </MenuToggle>
      )}
      isOpen={isHeaderDropdownOpen}
      onOpenChange={isOpen => setHeaderDropdownOpen(isOpen)}
      shouldFocusToggleOnSelect
      id="notification-dropdown"
      popperProps={{position: "right"}}
    >
      <DropdownList>
        <DropdownItem
          key="markAllRead"
          onClick={() => dispatch({type: "NOTIFICATION.READ.ALL"})}
          {...drawer.markAllRead.mark}
        >
          Mark all read
        </DropdownItem>
        <DropdownItem
          key="clearAll"
          onClick={() => dispatch({type: "NOTIFICATION.DESTROY.ALL"})}
          {...drawer.clearAll.mark}
        >
          Clear all
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};
