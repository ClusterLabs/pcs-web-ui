import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintRow } from "./ConstraintRow";
import { ConstraintCell } from "./ConstraintCell";

const getScore = (constraint: types.cluster.ConstraintLocation) => {
  if ("score" in constraint) {
    return constraint.score;
  }

  if ("score-attribute" in constraint) {
    return constraint["score-attribute"];
  }

  return "";
};

export const ConstraintRowLocation = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintLocation;
}) => {
  const ariaLabel = `Location constraint ${constraint.id}`;
  const clusterName = useSelectedClusterName();
  if ("node" in constraint) {
    return (
      <ConstraintRow aria-labelledby={ariaLabel}>
        <ConstraintCell label="Type" value="Location" />
        <ConstraintCell label="Node">
          <Link to={`/cluster/${clusterName}/nodes/${constraint.node}`}>
            {constraint.node}
          </Link>
        </ConstraintCell>

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
        <ConstraintCell label="Score" value={constraint.score} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={ariaLabel}>
      <ConstraintCell label="Type" value="Location (rule)" />
      <ConstraintCell label="Rule" value={constraint.rule_string} />
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
      <ConstraintCell label="Score" value={getScore(constraint)} />
    </ConstraintRow>
  );
};
