import React from "react";
import { DataList, StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import { ConstraintRowLocation } from "./ConstraintRowLocation";
import { ConstraintRowColocation } from "./ConstraintRowColocation";
import { ConstraintRowOrder } from "./ConstraintRowOrder";
import { ConstraintRowTicket } from "./ConstraintRowTicket";

export const ConstraintList = ({
  constraintPacks,
}: {
  constraintPacks: types.cluster.ConstraintPack[];
}) => {
  return (
    <StackItem>
      <DataList aria-label="Constraints">
        {constraintPacks.map((pack) => {
          switch (pack.type) {
            case "LOCATION":
              return (
                <ConstraintRowLocation
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "COLOCATION":
              return (
                <ConstraintRowColocation
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "TICKET":
              return (
                <ConstraintRowTicket
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "ORDER":
            default:
              return (
                <ConstraintRowOrder
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
          }
        })}
      </DataList>
    </StackItem>
  );
};
