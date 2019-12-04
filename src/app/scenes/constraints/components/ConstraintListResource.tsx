import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import ConstraintRowLocation from "./ConstraintRowLocation";
import ConstraintRowLocationRule from "./ConstraintRowLocationRule";
import ConstraintRowColocation from "./ConstraintRowColocation";
import ConstraintRowColocationSet from "./ConstraintRowColocationSet";
import ConstraintRowOrder from "./ConstraintRowOrder";
import ConstraintRowOrderSet from "./ConstraintRowOrderSet";
import * as selectors from "../selectors";

const ConstraintListResource = ({ primitive }: {
  primitive: Primitive,
}) => {
  const constraintList = useSelector(
    selectors.getConstraintsForResource(primitive),
  );
  return (
    <DataList aria-label={`Constraints of resource ${primitive.id}`}>
      {constraintList.map((constraint) => {
        switch (constraint.type) {
          case "LOCATION": return (
            <ConstraintRowLocation
              constraint={constraint}
              key={constraint.id}
            />
          );
          case "LOCATION.RULE": return (
            <ConstraintRowLocationRule
              constraint={constraint}
              key={constraint.id}
            />
          );
          case "COLOCATION": return (
            <ConstraintRowColocation
              constraint={constraint}
              resourceId={primitive.id}
              key={constraint.id}
            />
          );
          case "COLOCATION.SET": return (
            <ConstraintRowColocationSet
              constraint={constraint}
              key={constraint.id}
            />
          );
          case "ORDER": return (
            <ConstraintRowOrder
              constraint={constraint}
              resourceId={primitive.id}
              key={constraint.id}
            />
          );
          case "ORDER.SET": return (
            <ConstraintRowOrderSet
              constraint={constraint}
              key={constraint.id}
            />
          );
          default: return null;
        }
      })}
    </DataList>
  );
};

export default ConstraintListResource;
