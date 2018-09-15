import React from 'react';
import {Grid, Header} from 'semantic-ui-react'


import DetailMenu from "./DetailsMenu.js"

const ClusterPageContent = ({
  clusterName,
  activeMenu,
  children,
}) => (
  <React.Fragment>
    <Header as="h1">{`Cluster: ${clusterName}`}</Header>
    <Grid>

      <Grid.Column width={4}>
        <DetailMenu active={activeMenu} clusterName={clusterName}/>
      </Grid.Column>

      <Grid.Column width={12}>
        {children}
      </Grid.Column>

    </Grid>
  </React.Fragment>
)
export default ClusterPageContent;
