import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationContainer from "../components/NotificationContainer";
import * as actions from "../actions";
import { selectors } from "../plugin";

const mapStateToProps = state => ({
  notifications: selectors.getNotifications(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationContainer);
