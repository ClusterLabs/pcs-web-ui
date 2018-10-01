import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as rawDataLoadActions from "app/services/data-load/actions";

import * as actions from "../actions";
import Page from "../components/Page";

const mapStateToProps = state => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  dataLoadActions: bindActionCreators(rawDataLoadActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
