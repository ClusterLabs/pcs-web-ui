import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";


export default ({ dashboard }) => (
  <React.Fragment>
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {dashboard.dashboardData.clusterList.map(cluster => (
          <Table.Row key={cluster.name}>
            <Table.Cell>
              <Link to={`/cluster/${cluster.name}`}>{cluster.name}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </React.Fragment>
);
