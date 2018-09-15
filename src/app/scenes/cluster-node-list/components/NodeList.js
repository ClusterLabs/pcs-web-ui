import React from 'react';
import {Table} from 'semantic-ui-react'

const ClusterNodeList = ({nodeList}) => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>


    <Table.Body>
      {nodeList.map(node => (
        <Table.Row key={node.name}>
          <Table.Cell>{node.name}</Table.Cell>
          <Table.Cell>{node.status}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
export default ClusterNodeList;
