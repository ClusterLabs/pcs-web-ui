import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";
import { ConstraintLocationCellRscPoint } from "./ConstraintLocationCellRscPoint";

export const ConstraintRowLocationNode = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintLocationNode;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location" />
          <ConstraintCell label="Node">
            <Link to={`/cluster/${clusterName}/nodes/${constraint.node}`}>
              {constraint.node}
            </Link>
          </ConstraintCell>
          <ConstraintLocationCellRscPoint constraint={constraint} />
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
};
