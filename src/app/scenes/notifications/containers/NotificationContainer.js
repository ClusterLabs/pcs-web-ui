import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationContainer from "../components/NotificationContainer";
import * as actions from "../actions";

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationContainer);
