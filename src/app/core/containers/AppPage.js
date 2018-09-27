import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "app/scenes/login/actions";

import AppPage from "../components/AppPage";

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
