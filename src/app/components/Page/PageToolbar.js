import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, withStateHandlers } from "recompose";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";


import { logout } from "app/scenes/login/actions";

const withDropdown = withStateHandlers(
  {
    isDropdownOpen: false,
  },
  {
    onDropdownSelect: ({ isDropdownOpen }) => () => ({
      isDropdownOpen: !isDropdownOpen,
    }),
    onDropdownToggle: () => isDropdownOpen => ({
      isDropdownOpen,
    }),
  },
);

const withLogout = connect(
  () => ({}),
  dispatch => ({
    actions: bindActionCreators({ logout }, dispatch),
  }),
);

const PageToolbarView = (
  {
    onDropdownSelect,
    isDropdownOpen,
    onDropdownToggle,
    actions,
  },
) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarItem>
        <Dropdown
          isPlain
          position="right"
          onSelect={onDropdownSelect}
          isOpen={isDropdownOpen}
          toggle={(
            <DropdownToggle onToggle={onDropdownToggle}>
              hacluster
            </DropdownToggle>
          )}
          dropdownItems={[
            <DropdownItem key="0" onClick={actions.logout}>
              Logout
            </DropdownItem>,
          ]}
        />
      </ToolbarItem>
    </ToolbarGroup>
  </Toolbar>
);

export default compose(withDropdown, withLogout)(PageToolbarView);
