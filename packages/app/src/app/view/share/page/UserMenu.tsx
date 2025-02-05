import React from "react";
import {
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  MenuToggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {getLocalStyle, setLocalStyle} from "app/view/colorScheme";

import {useDispatch} from "../useDispatch";
import {useUsername} from "../useUsername";

const {userMenu} = testMarks.header;

export const UserMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(getLocalStyle());
  const changeTheme = React.useCallback(
    (requestedTheme: "dark" | "light" | "auto") => {
      setTheme(requestedTheme);
      setLocalStyle(requestedTheme);
    },
    [],
  );
  const dispatch = useDispatch();
  const username = useUsername();

  return (
    <Dropdown
      onSelect={() => setDropdownOpen(!isDropdownOpen)}
      isOpen={isDropdownOpen}
      popperProps={{position: "right"}}
      toggle={toggleRef => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          isExpanded={isDropdownOpen}
          isFullHeight
          {...userMenu.mark}
        >
          {username}
        </MenuToggle>
      )}
    >
      <DropdownList>
        <DropdownItem key="dark-switcher" component="div">
          <DropdownGroup label="Style" key="dark-switcher">
            <ToggleGroup>
              <ToggleGroupItem
                text="Default"
                isSelected={theme !== "light" && theme !== "dark"}
                onChange={() => changeTheme("auto")}
              />
              <ToggleGroupItem
                text="Light"
                isSelected={theme === "light"}
                onChange={() => changeTheme("light")}
              />
              <ToggleGroupItem
                text="Dark"
                isSelected={theme === "dark"}
                onChange={() => changeTheme("dark")}
              />
            </ToggleGroup>
          </DropdownGroup>
        </DropdownItem>
        <DropdownItem
          key="0"
          onClick={() => dispatch({type: "LOGIN.LOGOUT"})}
          {...userMenu.logout.mark}
        >
          Logout
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};
