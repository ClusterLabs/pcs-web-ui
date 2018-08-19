import React from 'react';
import {Breadcrumb, Container, Loader} from 'semantic-ui-react'
import {Link} from "react-router-dom";

import TopMenu from "../../../components/TopMenu.js"
import ClusterOverview from "./ClusterOverview.js"

export default class Page extends React.Component{
  componentDidMount(){
    this.props.actions.syncClusterData(this.props.match.params.name);
  }
  componentWillUnmount(){
    this.props.actions.syncClusterDataStop();
  }
  render(){
    return (
      <React.Fragment>
        <TopMenu breadcrumbs={
          <Breadcrumb>
            <Breadcrumb.Section as={() => <Link to="/">Clusters</Link>}/>
            <Breadcrumb.Divider as={() => <span> / </span>}/>
            <Breadcrumb.Section
              active
              as={() => <span>{this.props.match.params.name}</span>}
            />
          </Breadcrumb>
        }/>

        <Container>
          {
            this.props.cluster.clusterData.name === this.props.match.params.name
            ? <ClusterOverview clusterData={this.props.cluster.clusterData}/>
            : <Loader active>{
                `Loading a status of the cluster
                ${this.props.match.params.name}.`
              }</Loader>
          }
        </Container>
      </React.Fragment>
    )
  }
}
