import React from 'react';
import {Container, Loader, Grid, Header} from 'semantic-ui-react'

import DetailMenu from "./DetailsMenu.js"

const ClusterPageContent = ({
  clusterUrlId,
  clusterName,
  activeMenu,
  children,
}) => (
  <Container>{
    clusterName === clusterUrlId
    ? <React.Fragment>
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

    : <Loader active>
        {`Loading a status of the cluster ${clusterUrlId}.`}
      </Loader>
  }</Container>
)
export default ClusterPageContent;
