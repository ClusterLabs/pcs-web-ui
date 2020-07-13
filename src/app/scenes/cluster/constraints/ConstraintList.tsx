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
        {constraintPacks.map((pack) => {
          switch (pack.type) {
            case "LOCATION_NODE":
              return (
                <ConstraintRowLocationNode
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "LOCATION_RULE":
              return (
                <ConstraintRowLocationRule
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "COLOCATION_PAIR":
              return (
                <ConstraintRowColocationPair
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "COLOCATION_SET":
              return (
                <ConstraintRowColocationSet
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "TICKET_RESOURCE":
              return (
                <ConstraintRowTicketResource
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "TICKET_SET":
              return (
                <ConstraintRowTicketSet
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "ORDER_PAIR":
              return (
                <ConstraintRowOrderPair
                  constraint={pack.constraint}
                  key={pack.constraint.id}
                />
              );
            case "ORDER_SET":
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
