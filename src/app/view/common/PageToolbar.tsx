import React from "react";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { Action } from "app/actions";
import { useUsername } from "app/view/hooks";

export const PageToolbar = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const username = useUsername();
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Dropdown
            aria-label="User menu"
            isPlain
            position="right"
            onSelect={() => setDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
            toggle={(
              <DropdownToggle onToggle={() => setDropdownOpen(!isDropdownOpen)}>
                {username}
              </DropdownToggle>
            )}
            dropdownItems={[
              (
                <DropdownItem
                  aria-label="Logout action"
                  key="0"
                  onClick={() => dispatch<Action>({ type: "LOGOUT" })}
                >
                  Logout
                </DropdownItem>
              ),
            ]}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
};
