import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";
import { Resource } from "app/services/cluster/types";

export interface Props {
  resource: Resource
}

const ResourceListItem = ({ resource: { id } }: Props) => (
  <DataListItem aria-labelledby={id}>
    <DataListCell>
      {id}
    </DataListCell>
  </DataListItem>
);
export default ResourceListItem;
