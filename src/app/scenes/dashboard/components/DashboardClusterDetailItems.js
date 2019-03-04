import React from "react";
import { StyleSheet, css } from "@patternfly/react-styles";
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
} from "@patternfly/react-table";
import {
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardBody,
} from "@patternfly/react-core";

const styles = StyleSheet.create({
  card: {
    "margin-top": "1rem!important",
  },
  items: {
    padding: "0.5rem",
  },
});

const DashboardClusterDetailItems = ({
  columns,
  itemList,
  isItemOk,
  compareItems,
  itemToRow,
  itemType,
  noItemMessage,
}) => {
  const [hideOk, setHideOk] = React.useState(true);
  const rows = [...itemList]
    .filter(item => (hideOk ? !isItemOk(item) : true))
    .sort(compareItems)
    .map(itemToRow)
  ;

  const items = rows.length === 0
    ? <p className={css(styles.items)}>{noItemMessage}</p>
    : (
      <Table
        aria-label={`Dashboard cluster ${itemType}`}
        variant={TableVariant.compact}
        rows={rows}
        cells={columns}
      >
        <TableHeader />
        <TableBody />
      </Table>
    )
  ;

  return (
    <Card className={css(styles.card)}>
      <CardHeader>{itemType.toUpperCase()}</CardHeader>
      <CardBody>
        <Tabs activeKey={hideOk ? 0 : 1} onSelect={() => setHideOk(!hideOk)}>
          <Tab eventKey={1} title="All">
            {items}
          </Tab>
          <Tab eventKey={0} title="Only with issues">
            {items}
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default DashboardClusterDetailItems;
