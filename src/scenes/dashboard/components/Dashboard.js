import React from 'react';
import {Table, Header} from 'semantic-ui-react'

export default ({dashboard, actions}) => (
  <React.Fragment>
    <Header as="h3">Cluster List</Header>
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {dashboard.dashboardData.clusterList.map(cluster => (
        <Table.Row key={cluster.name}>
          <Table.Cell>{cluster.name}</Table.Cell>
        </Table.Row>
      ))}
      </Table.Body>
    </Table>
  </React.Fragment>
);
