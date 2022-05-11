import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { useDispatch } from "app/view/share/useDispatch";
import { useUsername } from "app/view/share/useUsername";

export const PageToolbar = ({
  notificationBadge,
}: {
  notificationBadge: React.ReactNode;
}) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const username = useUsername();

  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>{notificationBadge}</ToolbarItem>

        <ToolbarItem>
          <Dropdown
            data-test="menu-user"
            isPlain
            position="right"
            onSelect={() => setDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
            toggle={
              <DropdownToggle onToggle={() => setDropdownOpen(!isDropdownOpen)}>
                {username}
              </DropdownToggle>
            }
            dropdownItems={[
              <DropdownItem
                data-test="logout"
                key="0"
                onClick={() => dispatch({ type: "LOGIN.LOGOUT" })}
              >
                Logout
              </DropdownItem>,
            ]}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
