import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LogoutMenuItem from "../components/LogoutMenuItem";
import { logout } from "../actions";

const mapStateToProps = state => ({
  loginRequired: state.login.required,
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutMenuItem);
