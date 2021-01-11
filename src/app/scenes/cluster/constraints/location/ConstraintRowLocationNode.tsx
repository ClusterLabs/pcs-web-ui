import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { location, types } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

import { ConstraintLocationDescRscPoint } from "./ConstraintLocationDescRscPoint";

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
          <ConstraintCell label="Type" value="Location" width={1} />
          <DataListCell width={3}>
            <ConstraintLocationDescRscPoint constraint={constraint} />
            {" in role "}
            <strong>{constraint.role || "Started"}</strong>
            {" on node "}
            <strong>
              <Link
                to={location.node({ clusterName, nodeName: constraint.node })}
              />
            </strong>
          </DataListCell>
          <ConstraintCell label="Score" value={constraint.score} width={1} />
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Resource discovery"
            value={constraint["resource-discovery"]}
          />
        </>
      }
    />
  );
};
