import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

const Resource = ({ resource: { name } }) => (
  <DataListItem aria-labelledby={name}>
    <DataListCell>
      {name}
    </DataListCell>
  </DataListItem>
);
export default Resource;
