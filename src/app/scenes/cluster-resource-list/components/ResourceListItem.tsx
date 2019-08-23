import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

import { Resource } from "app/services/cluster/types";

const ResourceListItem = ({ resource: { id } }: { resource: Resource }) => (
  <DataListItem aria-labelledby={id}>
    <DataListCell>
      {id}
    </DataListCell>
  </DataListItem>
);
export default ResourceListItem;
