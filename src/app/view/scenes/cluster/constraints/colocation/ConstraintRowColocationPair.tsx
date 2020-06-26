import React from "react";

import { types, url } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

export const ConstraintRowColocationPair = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintColocationPair;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Colocation" />
          <ConstraintCell label="Resource">
            <Link to={url.cluster.resources(clusterName, constraint.rsc)} />
          </ConstraintCell>
          <ConstraintCell label="With resource">
            <Link
              to={url.cluster.resources(clusterName, constraint["with-rsc"])}
            />
          </ConstraintCell>
          <ConstraintCell label="Score" value={constraint.score} />
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Node attribute"
            value={constraint["node-attribute"]}
          />
          <ConstraintValue
            label="Resource role"
            value={constraint["rsc-role"]}
          />
          <ConstraintValue
            label="With resource role"
            value={constraint["with-rsc-role"]}
          />
          <ConstraintValue
            label="Resource instance"
            value={constraint["rsc-instance"]}
          />
          <ConstraintValue
            label="With resource instance"
            value={constraint["with-rsc-instance"]}
          />
        </>
      }
    />
  );
};
