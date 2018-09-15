import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../actions.js"
import Page from "../components/Page.js"

const mapStateToProps = (state) => {
  return {
    clusterNodeAdd: state.clusterNodeAdd,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
