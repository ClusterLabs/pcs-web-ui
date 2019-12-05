import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import ConstraintRowLocation from "./ConstraintRowLocation";
import ConstraintRowColocation from "./ConstraintRowColocation";
import ConstraintRowOrder from "./ConstraintRowOrder";
import * as selectors from "../selectors";

const ConstraintListResource = ({ primitive }: {
  primitive: Primitive,
}) => {
  const constraintList = useSelector(
    selectors.getConstraintsForResource(primitive),
  );
  return (
    <DataList aria-label={`Constraints of resource ${primitive.id}`}>
      {constraintList.map((pack) => {
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
              resourceId={primitive.id}
              key={pack.constraint.id}
            />
          );
          case "ORDER": default: return (
            <ConstraintRowOrder
              constraint={pack.constraint}
              resourceId={primitive.id}
              key={pack.constraint.id}
            />
          );
        }
      })}
    </DataList>
  );
};

export default ConstraintListResource;
