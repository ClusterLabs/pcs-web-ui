import React from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";


import * as actions from "app/scenes/login/actions";

const withLogout = connect(
  null,
  { logout: actions.logout },
);

const PageToolbarView = ({ logout }) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
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
                <DropdownItem key="0" onClick={logout} data-role="logout">
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

export default withLogout(PageToolbarView);
