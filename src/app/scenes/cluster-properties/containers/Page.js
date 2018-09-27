import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../actions";
import Page from "../components/Page";

const mapStateToProps = state => ({
  clusterProperties: state.clusterProperties,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
