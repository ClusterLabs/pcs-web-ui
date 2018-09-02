import React from 'react';
import {Menu} from 'semantic-ui-react'

import LogoutMenuItem from "~/scenes/login/containers/LogoutMenuItem.js"

const TopMenu = ({breadcrumbs}) => (
  <Menu inverted>
    <Menu.Item>
    {breadcrumbs}
    </Menu.Item>
    <LogoutMenuItem/>
  </Menu>
);
export default TopMenu;
