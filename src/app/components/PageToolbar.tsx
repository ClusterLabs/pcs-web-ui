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


import { LoginActionType } from "app/scenes/login/types";

const PageToolbarView = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
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
                hacluster
              </DropdownToggle>
            )}
            dropdownItems={[
              (
                <DropdownItem
                  key="0"
                  onClick={() => dispatch({ type: LoginActionType.LOGOUT })}
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
