import React from "react";
import { useSelector } from "react-redux";
import { DataList } from "@patternfly/react-core";

import { Primitive } from "app/services/cluster/types";

import ConstraintLocation from "./ConstraintLocation";
import ConstraintLocationRule from "./ConstraintLocationRule";
import ConstraintColocation from "./ConstraintColocation";
import ConstraintColocationSet from "./ConstraintColocationSet";
import ConstraintOrder from "./ConstraintOrder";
import * as selectors from "../selectors";

const ResourceConstraintList = ({ primitive }: {
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
          case "LOCATION.RULE": return (
            <ConstraintLocationRule
              constraint={constraint}
              key={constraint.id}
            />
          );
          case "COLOCATION": return (
            <ConstraintColocation
              constraint={constraint}
              resourceId={primitive.id}
              key={constraint.id}
            />
          );
          case "COLOCATION.SET": return (
            <ConstraintColocationSet
              constraint={constraint}
              key={constraint.id}
            />
          );
          case "ORDER": return (
            <ConstraintOrder
              constraint={constraint}
              resourceId={primitive.id}
              key={constraint.id}
            />
          );
          default: return null;
        }
      })}
    </DataList>
  );
};

export default ResourceConstraintList;
