import React from "react";
import { useSelector } from "react-redux";
import {
  DataList,
  Stack,
  StackItem,
  ToolbarItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  EmptyStateNoItem,
  ToolbarFilterAction,
  ToolbarFilterGroups,
} from "app/view/share";

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

type ConstraintPackList = selectors.ExtractClusterSelector<
  typeof selectors.getConstraints
>;

const filterGroups = {
  Location: false,
  "Location (rule)": false,
  Colocation: false,
  "Colocation (set)": false,
  Order: false,
  "Order (set)": false,
  Ticket: false,
  "Ticket (set)": false,
};
const useState = () => {
  const groupState = ToolbarFilterGroups.useState(filterGroups);
  const [groupInclusionMap] = groupState;

  const filterConstraintTypes = React.useCallback(
    (constraintPacks: ConstraintPackList): ConstraintPackList =>
      constraintPacks.filter(cp =>
        ToolbarFilterGroups.allOrIncludedGroupMembers({
          groupInclusionMap,
          groupMembershipMap: { ...filterGroups, [cp.type]: true },
        }),
      ),
    [groupInclusionMap],
  );
  return {
    filterState: {
      groupState,
    },
    filterConstraintTypes,
  };
};

export const ConstraintFilteredList: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  const constraintPacks = useSelector(selectors.getConstraints(clusterName));
  const { filterState, filterConstraintTypes } = useState();
  const clearAllFilters = () => {
    const [groupInclusionMap, setGroupInclusionMap] = filterState.groupState;
    setGroupInclusionMap(
      ToolbarFilterGroups.unselectAllOptions(groupInclusionMap),
    );
  };
  if (constraintPacks.length === 0) {
    return (
      <EmptyStateNoItem
        title="No constraint is configured."
        message="You don't have any configured constraint here."
      />
    );
  }
  return (
    <Stack hasGutter>
      <StackItem>
        <ToolbarFilterAction clearAllFilters={clearAllFilters}>
          <ToolbarItem>
            <ToolbarFilterGroups
              name="Constraint type"
              filterState={filterState.groupState}
            />
          </ToolbarItem>
        </ToolbarFilterAction>
      </StackItem>
      <StackItem>
        <DataList aria-label="Constraints">
          {filterConstraintTypes(constraintPacks).map((pack, i) => {
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
    </Stack>
  );
};
