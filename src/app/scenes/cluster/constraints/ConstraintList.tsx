import React from "react";
import { DataList, StackItem } from "@patternfly/react-core";

import { types } from "app/store";

import {
  ConstraintRowLocationNode,
  ConstraintRowLocationRule,
} from "./location";
import {
  ConstraintRowColocationPair,
  ConstraintRowColocationSet,
} from "./colocation";
import { ConstraintRowOrderPair, ConstraintRowOrderSet } from "./order";
import { ConstraintRowTicketResource, ConstraintRowTicketSet } from "./ticket";

export const ConstraintList = ({
  constraintPacks,
}: {
  constraintPacks: types.cluster.ConstraintPack[];
}) => {
  return (
    <StackItem>
      <DataList aria-label="Constraints">
        {constraintPacks.map((pack, i) => {
          switch (pack.type) {
            case "Location":
              return (
                <ConstraintRowLocationNode
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "Location (rule)": {
              const id =
                "id" in pack.constraint
                  ? pack.constraint.id
                  : `${pack.constraint["id-ref"]}-${
                    "rsc" in pack.constraint
                      ? pack.constraint.rsc
                      : pack.constraint["rsc-pattern"]
                  }-${i}`;
              return (
                <ConstraintRowLocationRule
                  constraint={pack.constraint}
                  key={id}
                  id={id}
                />
              );
            }
            case "Colocation":
              return (
                <ConstraintRowColocationPair
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "Colocation (set)":
              return (
                <ConstraintRowColocationSet
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "Ticket":
              return (
                <ConstraintRowTicketResource
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "Ticket (set)":
              return (
                <ConstraintRowTicketSet
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "Order":
              return (
                <ConstraintRowOrderPair
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "Order (set)":
            default:
              return (
                <ConstraintRowOrderSet
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
