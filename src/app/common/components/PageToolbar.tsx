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

import { Action } from "app/common/actions";
import { useUsername } from "app/services/username";

const PageToolbarView = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const username = useUsername();
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Dropdown
            isPlain
            position="right"
            onSelect={() => setDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
            toggle={(
              <DropdownToggle
                onToggle={() => setDropdownOpen(!isDropdownOpen)}
                data-role="user-menu"
              >
                {username}
              </DropdownToggle>
            )}
            dropdownItems={[
              (
                <DropdownItem
                  key="0"
                  onClick={() => dispatch<Action>({ type: "LOGOUT" })}
                  data-role="logout"
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

export default PageToolbarView;
