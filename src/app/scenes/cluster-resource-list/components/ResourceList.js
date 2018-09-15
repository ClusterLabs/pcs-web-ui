import React from 'react';
import {Table} from 'semantic-ui-react'

const ClusterResourceList = ({resourceList}) => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
      </Table.Row>
    </Table.Header>


    <Table.Body>
      {resourceList.map(resource => (
        <Table.Row key={resource.name}>
          <Table.Cell>{resource.name}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
export default ClusterResourceList;
