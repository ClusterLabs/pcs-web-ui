import React from 'react';
import {Menu} from 'semantic-ui-react'

import LogoutMenuItem from "../scenes/login/containers/LogoutMenuItem.js"

export default ({breadcrumbs}) => (
    <Menu inverted>
      <Menu.Item>
      {breadcrumbs}
      </Menu.Item>
      <LogoutMenuItem/>
    </Menu>
)
