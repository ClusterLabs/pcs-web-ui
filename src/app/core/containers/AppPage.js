import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "app/scenes/login/actions.js";

import AppPage from "../components/AppPage.js";

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(actions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
