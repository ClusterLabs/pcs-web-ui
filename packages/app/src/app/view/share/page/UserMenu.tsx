import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
} from "@patternfly/react-core/deprecated";
import React from "react";

import {testMarks} from "app/view/dataTest";

import {useDispatch} from "../useDispatch";
import {useUsername} from "../useUsername";

const {userMenu} = testMarks.header;

export const UserMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const username = useUsername();

  return (
    <Dropdown
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
          key="0"
          onClick={() => dispatch({type: "LOGIN.LOGOUT"})}
          {...userMenu.logout.mark}
        >
          Logout
        </DropdownItem>,
      ]}
      {...userMenu.mark}
    />
  );
};
