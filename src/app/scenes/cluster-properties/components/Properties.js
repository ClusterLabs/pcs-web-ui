import React from 'react';
import {Table} from 'semantic-ui-react'

const ClusterProperties = ({properties}) => (
  <Table striped>
    <Table.Body>
      {properties.filter(property => ! property.advanced).map(property => (
        <Table.Row key={property.name}>
          <Table.Cell>{property.label}</Table.Cell>
        </Table.Row>
      ))}
      {properties.filter(property => property.advanced).map(property => (
        <Table.Row key={property.name}>
          <Table.Cell>{property.label}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
export default ClusterProperties;
