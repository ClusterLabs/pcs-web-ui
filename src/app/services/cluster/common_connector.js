import React, { createElement } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as clusterActions from "./actions";


class Page extends React.Component {
  componentDidMount() {
    const { actions, match } = this.props;
    actions.syncClusterData(match.params.name);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.syncClusterDataStop();
  }

  render() {
    const {
      concretePage,
      cluster,
      actions,
      match,
    } = this.props;
    return createElement(concretePage, {
      cluster,
      actions,
      match,
    });
  }
}

export default (PageComponent) => {
  const mapStateToProps = state => ({
    cluster: state.cluster,
    concretePage: PageComponent,
  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(clusterActions, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Page);
};
