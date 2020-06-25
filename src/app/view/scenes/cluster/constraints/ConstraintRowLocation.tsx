import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "./common";

const getScore = (constraint: types.cluster.ConstraintLocation) => {
  if ("score" in constraint) {
    return constraint.score;
  }

  if ("score-attribute" in constraint) {
    return constraint["score-attribute"];
  }

  return "";
};

type Location = types.cluster.ConstraintLocation;

const ResourcePointingCell = ({ constraint }: { constraint: Location }) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      {"rsc" in constraint && (
        <ConstraintCell label="Resource">
          <Link to={`/cluster/${clusterName}/resources/${constraint.rsc}`}>
            {constraint.rsc}
          </Link>
        </ConstraintCell>
      )}
      {"rsc-pattern" in constraint && (
        <ConstraintCell
          label="Resources pattern"
          value={constraint["rsc-pattern"]}
        />
      )}
    </>
  );
};

export const ConstraintRowLocation = ({
  constraint,
}: {
  constraint: Location;
}) => {
  const ariaLabel = `Location constraint ${constraint.id}`;
  const clusterName = useSelectedClusterName();
  if ("node" in constraint) {
    return (
      <ConstraintRow
        aria-labelledby={ariaLabel}
        dataListCells={
          <>
            <ConstraintCell label="Type" value="Location" />
            <ConstraintCell label="Node">
              <Link to={`/cluster/${clusterName}/nodes/${constraint.node}`}>
                {constraint.node}
              </Link>
            </ConstraintCell>
            <ResourcePointingCell constraint={constraint} />
            <ConstraintCell label="Score" value={constraint.score} />
          </>
        }
        content={
          <>
            <ConstraintValue
              label="Resource discovery"
              value={constraint["resource-discovery"]}
            />
            <ConstraintValue label="Role" value={constraint.role} />
          </>
        }
      />
    );
  }
  return (
    <ConstraintRow
      aria-labelledby={ariaLabel}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location (rule)" />
          <ConstraintCell label="Rule" value={constraint.rule_string} />
          <ResourcePointingCell constraint={constraint} />
          <ConstraintCell label="Score" value={getScore(constraint)} />
        </>
      }
      content={
        <>
          {"id-ref" in constraint && (
            <ConstraintValue
              label="Referenced Id"
              value={constraint["id-ref"]}
            />
          )}
          {"role" in constraint && (
            <ConstraintValue label="Role" value={constraint.role} />
          )}
        </>
      }
    />
  );
};
