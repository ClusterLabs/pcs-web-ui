import React from 'react';
import {Menu} from 'semantic-ui-react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {logout} from "../actions.js"

const LogoutMenuItem = ({loginRequired, logout}) => (
    ! loginRequired
    ? <Menu.Item name='Logout'
        data-role="logout"
        onClick={logout}
        position="right"
      />
    : null
)

const mapStateToProps = (state) => {
  return {
    loginRequired: state.login.required,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps,)(LogoutMenuItem);
