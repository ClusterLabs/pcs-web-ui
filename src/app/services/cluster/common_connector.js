import React, { createElement } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as rawDataLoadActions from "app/services/data-load/actions";

import * as clusterActions from "./actions";

class Page extends React.Component {
  componentDidMount() {
    const { match, dataLoadActions } = this.props;
    dataLoadActions.setUpDataReading({
      reloadCluster: {
        specificator: match.params.name,
        start: clusterActions.syncClusterData(match.params.name),
        stop: clusterActions.syncClusterDataStop(),
      },
    });
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
    dataLoadActions: bindActionCreators(rawDataLoadActions, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Page);
};
