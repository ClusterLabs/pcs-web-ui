import React from "react";
import { Table } from "semantic-ui-react";

export default ({ stonithList }) => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
      </Table.Row>
    </Table.Header>


    <Table.Body>
      {stonithList.map(stonith => (
        <Table.Row key={stonith.name}>
          <Table.Cell>{stonith.name}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
