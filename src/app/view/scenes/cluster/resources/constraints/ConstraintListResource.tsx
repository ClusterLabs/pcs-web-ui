import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { NoItemCase } from "app/view/common";
import { types, selectors } from "app/store";

import ConstraintRowLocation from "./ConstraintRowLocation";
import ConstraintRowColocation from "./ConstraintRowColocation";
import ConstraintRowOrder from "./ConstraintRowOrder";
import ConstraintRowTicket from "./ConstraintRowTicket";

const ConstraintListResource = ({ resource }: {
  resource: types.cluster.ResourceTreeItem,
}) => {
  const constraintPacks = useSelector(
    selectors.resourceGetConstraints(resource),
  );
  if (constraintPacks.length === 0) {
    return <NoItemCase margin={false} message="No constraint is configured." />;
  }
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
