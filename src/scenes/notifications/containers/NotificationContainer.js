import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import NotificationContainer from "../components/NotificationContainer.js";
import * as actions from "../actions.js";

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationContainer);
