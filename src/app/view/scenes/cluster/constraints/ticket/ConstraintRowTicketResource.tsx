import React from "react";

import { types } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

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
          <ConstraintCell label="Type" value="Ticket" />
          <ConstraintCell label="Ticket" value={constraint.ticket} />
          <ConstraintCell label="Resource">
            <Link to={`/cluster/${clusterName}/resources/${constraint.rsc}`}>
              {constraint.rsc}
            </Link>
          </ConstraintCell>
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Loss policy"
            value={constraint["loss-policy"]}
          />
          <ConstraintValue
            label="Resource role"
            value={constraint["rsc-role"]}
          />
        </>
      }
    />
  );
};
