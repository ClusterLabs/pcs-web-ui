import React, {createElement} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "./actions.js"


class Page extends React.Component{
  componentDidMount(){
    this.props.actions.syncClusterData(this.props.match.params.name);
  }
  componentWillUnmount(){
    this.props.actions.syncClusterDataStop();
  }
  render(){
    return createElement(this.props.concretePage, {
      cluster: this.props.cluster,
      actions: this.props.actions,
      match: this.props.match
    });
  }
}

export default (PageComponent) => {
  const mapStateToProps = (state) => {
    return {
      cluster: state.cluster,
      concretePage: PageComponent,
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch),
    }
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Page);
}

