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
  Card,
  EmptyStateClusterStopped,
  EmptyStateNoItem,
  ToolbarFilterAction,
  ToolbarFilterGroups,
  useClusterSelector,
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

export const ConstraintFilteredList = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  const constraintPacks = useSelector(selectors.getConstraints(clusterName));
  const { filterState, filterConstraintTypes } = useState();
  const clearAllFilters = () => {
    const [groupInclusionMap, setGroupInclusionMap] = filterState.groupState;
    setGroupInclusionMap(
      ToolbarFilterGroups.unselectAllOptions(groupInclusionMap),
    );
  };
  const [cluster] = useClusterSelector(selectors.getCluster);

  if (!cluster.hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get constraints from stopped cluster"}
      />
    );
  }
  if (constraintPacks.length === 0) {
    return (
      <EmptyStateNoItem
        title="No constraint is configured."
        message="You don't have any configured constraint here."
      />
    );
  }
  return (
    <Card>
      <Stack hasGutter>
        <StackItem>
          <ToolbarFilterAction
            clearAllFilters={clearAllFilters}
            toolbarName="constraints"
          >
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
                      key={i}
                    />
                  );

                case "Location (rule)": {
                  return (
                    <ConstraintRowLocationRule
                      constraint={pack.constraint}
                      key={i}
                      uniqeId={i}
                    />
                  );
                }

                case "Colocation":
                  return (
                    <ConstraintRowColocationPair
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Colocation (set)":
                  return (
                    <ConstraintRowColocationSet
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Ticket":
                  return (
                    <ConstraintRowTicketResource
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Ticket (set)":
                  return (
                    <ConstraintRowTicketSet
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Order":
                  return (
                    <ConstraintRowOrderPair
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Order (set)":
                default:
                  return (
                    <ConstraintRowOrderSet
                      constraint={pack.constraint}
                      key={i}
                    />
                  );
              }
            })}
          </DataList>
        </StackItem>
      </Stack>
    </Card>
  );
};
