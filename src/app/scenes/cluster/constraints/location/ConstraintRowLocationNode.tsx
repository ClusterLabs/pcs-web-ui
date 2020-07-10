import React from "react";

import { types, url } from "app/store";
import { Link } from "app/view";
import { useSelectedClusterName } from "app/scenes";

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
            <Link to={url.cluster.nodes(clusterName, constraint.node)} />
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
