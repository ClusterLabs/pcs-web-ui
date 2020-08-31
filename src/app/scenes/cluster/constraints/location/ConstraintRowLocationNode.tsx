import React from "react";

import { types, url } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { DataListCell } from "@patternfly/react-core";
import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

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
            {"rsc" in constraint && constraint.rsc && (
              <>
                {"Resource "}
                <strong>
                  <Link
                    to={url.cluster.resources(clusterName, constraint.rsc)}
                  />
                </strong>
              </>
            )}
            {"rsc-pattern" in constraint && (
              <>
                {"Resource matching "}
                <strong>{constraint["rsc-pattern"]}</strong>
              </>
            )}
            {" in role "}
            <strong>{constraint.role || "Started"}</strong>
            {" on node "}
            <strong>
              <Link to={url.cluster.nodes(clusterName, constraint.node)} />
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
