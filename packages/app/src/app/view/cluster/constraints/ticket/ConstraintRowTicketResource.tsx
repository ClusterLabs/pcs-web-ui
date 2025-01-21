import {DataListCell} from "@patternfly/react-core";

import {remapDeprecatedRoles} from "app/store";

import {
  ConstraintCell,
  ConstraintCellFake,
  ConstraintLink,
  ConstraintResourceInRole,
  ConstraintRow,
  ConstraintValue,
} from "../common";
import type {ConstraintTicketResource} from "../types";

export const ConstraintRowTicketResource = ({
  constraint,
}: {
  constraint: ConstraintTicketResource;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      aria-labelledby={`Ticket constraint ${constraint.id}`}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Ticket" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <ConstraintLink type="resource" id={constraint.rsc} />
            {constraint["rsc-role"] !== undefined && (
              <ConstraintResourceInRole
                role={remapDeprecatedRoles(constraint["rsc-role"])}
              />
            )}
            {" depends on ticket "}
            <strong>{constraint.ticket}</strong>
          </DataListCell>
          <ConstraintCellFake />
        </>
      }
      content=<ConstraintValue
        label="Loss policy"
        value={constraint["loss-policy"]}
      />
    />
  );
};
