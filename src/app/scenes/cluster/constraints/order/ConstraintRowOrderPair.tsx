import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types, url } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

import { ConstraintCellOrderScoreKind } from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrderPair = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintOrderPair;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Order" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <strong>
              <Link to={url.cluster.resources(clusterName, constraint.first)} />
            </strong>
            {` ${constraint["first-action"] || "start"}s before `}
            {"resource "}
            <strong>
              <Link to={url.cluster.resources(clusterName, constraint.then)} />
            </strong>
            {` ${constraint["then-action"] || "start"}s`}
          </DataListCell>
          <ConstraintCellOrderScoreKind constraint={constraint} />
        </>
      }
      content={
        <>
          <ConstraintValue label="Symetrical" value={constraint.symmetrical} />
          <ConstraintValue
            label="Require all"
            value={constraint["require-all"]}
          />
        </>
      }
    />
  );
};
