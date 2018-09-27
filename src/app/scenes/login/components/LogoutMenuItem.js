import React from "react";
import { Menu } from "semantic-ui-react";

const LogoutMenuItem = ({ loginRequired, logout }) => (
  !loginRequired
    ? (
      <Menu.Item
        name="Logout"
        data-role="logout"
        onClick={logout}
        position="right"
      />
    )
    : null
);
export default LogoutMenuItem;
