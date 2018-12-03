import React from "react";
import { DataList } from "@patternfly/react-core";

import Resource from "./Resource";

const ClusterResourceList = ({ resourceList }) => (
  <DataList aria-label="Cluster resource list">
    {resourceList.map(resource => (
      <Resource
        key={resource.name}
        resource={resource}
      />
    ))}
  </DataList>
);
export default ClusterResourceList;
