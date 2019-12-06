import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { ResourceTreeItem } from "app/services/cluster/types";

import ConstraintRowLocation from "./ConstraintRowLocation";
import ConstraintRowColocation from "./ConstraintRowColocation";
import ConstraintRowOrder from "./ConstraintRowOrder";
import ConstraintRowTicket from "./ConstraintRowTicket";
import * as selectors from "../selectors";

const ConstraintListResource = ({ resource }: {
  resource: ResourceTreeItem,
}) => {
  const constraintPacks = useSelector(
    selectors.getConstraintsForResource(resource),
  );
  return (
    <DataList aria-label={`Constraints of resource ${resource.id}`}>
      {constraintPacks.map((pack) => {
        switch (pack.type) {
          case "LOCATION": return (
            <ConstraintRowLocation
              constraint={pack.constraint}
              key={pack.constraint.id}
            />
          );
          case "COLOCATION": return (
            <ConstraintRowColocation
              constraint={pack.constraint}
              resourceId={resource.id}
              key={pack.constraint.id}
            />
          );
          case "TICKET": return (
            <ConstraintRowTicket
              constraint={pack.constraint}
              key={pack.constraint.id}
            />
          );
          case "ORDER": default: return (
            <ConstraintRowOrder
              constraint={pack.constraint}
              resourceId={resource.id}
              key={pack.constraint.id}
            />
          );
        }
      })}
    </DataList>
  );
};

export default ConstraintListResource;
