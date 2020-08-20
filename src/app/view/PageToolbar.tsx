import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { useDispatch } from "app/store";
import { useUsername } from "app/view/useUsername";

export const PageToolbar = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const username = useUsername();
  return (
    <Toolbar>
      <ToolbarGroup>
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
                onClick={() => dispatch({ type: "LOGOUT" })}
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
