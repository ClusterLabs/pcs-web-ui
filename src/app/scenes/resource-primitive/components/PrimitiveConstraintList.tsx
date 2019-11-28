import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import ConstraintLocation from "./ConstraintLocation";
import ConstraintLocationRule from "./ConstraintLocationRule";
import * as selectors from "../selectors";

const PrimitiveConstraintList = ({ primitive }: {
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
            <ConstraintLocation
              constraint={constraint}
              key={constraint.id}
            />
          );
          case "LOCATION-RULE": return (
            <ConstraintLocationRule
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

export default PrimitiveConstraintList;
