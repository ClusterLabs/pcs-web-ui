import React from 'react';
import {Header, Segment, Table} from 'semantic-ui-react'

export default ({cluster}) => (
  <Segment data-role="cluster-overview">
    <Header as="h2">Settings</Header>
    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cluster name</Table.Cell>
          <Table.Cell data-role="cluster-name">{cluster.name}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Segment>
);
