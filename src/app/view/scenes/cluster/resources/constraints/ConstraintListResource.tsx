import React from "react";
import { useSelector } from "react-redux";
import {
  DataList,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types, selectors } from "app/store";

import { ConstraintRowLocation } from "./ConstraintRowLocation";
import { ConstraintRowColocation } from "./ConstraintRowColocation";
import { ConstraintRowOrder } from "./ConstraintRowOrder";
import { ConstraintRowTicket } from "./ConstraintRowTicket";

export const ConstraintListResource = ({ resource }: {
  resource: types.cluster.ResourceTreeItem;
}) => {
  const constraintPacks = useSelector(
    selectors.resourceGetConstraints(resource),
  );
  if (constraintPacks.length === 0) {
    return (
      <StackItem>
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg"> No constraint is configured. </Title>
          <EmptyStateBody>
            You don&apos;t have any configured constraint here.
          </EmptyStateBody>
        </EmptyState>
      </StackItem>
    );
  }
  return (
    <StackItem>
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
    </StackItem>
  );
};
