import React from "react";

import { types, url } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { DataListCell } from "@patternfly/react-core";
import {
  ConstraintCell,
  ConstraintCellFake,
  ConstraintRow,
  ConstraintValue,
} from "../common";

export const ConstraintRowTicketResource = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintTicketResource;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintRow
      aria-labelledby={`Ticket constraint ${constraint.id}`}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Ticket" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <strong>
              <Link to={url.cluster.resources(clusterName, constraint.rsc)} />
            </strong>
            {" in role "}
            <strong>{constraint["rsc-role"] || "Started"}</strong>
            {" depends on ticket "}
            <strong>{constraint.ticket}</strong>
          </DataListCell>
          <ConstraintCellFake />
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Loss policy"
            value={constraint["loss-policy"]}
          />
        </>
      }
    />
  );
};
