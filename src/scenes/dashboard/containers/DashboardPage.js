import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../actions.js"
import {logout} from "../../login/actions.js"
import DashboardPage from "../components/DashboardPage.js"

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    global: {
      loginRequired: state.login.required,
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    globalActions: bindActionCreators({logout}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
