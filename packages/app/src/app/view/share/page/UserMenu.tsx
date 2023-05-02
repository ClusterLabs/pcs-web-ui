import {Dropdown, DropdownItem, DropdownToggle} from "@patternfly/react-core";
import React from "react";

import {useDispatch} from "../useDispatch";
import {useUsername} from "../useUsername";

export const UserMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const username = useUsername();

  return (
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
          onClick={() => dispatch({type: "LOGIN.LOGOUT"})}
        >
          Logout
        </DropdownItem>,
      ]}
    />
  );
};
