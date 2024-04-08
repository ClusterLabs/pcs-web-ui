import {DataListCell} from "@patternfly/react-core";

import {remapDeprecatedRoles} from "app/store";

import {ConstraintResourceInRole, ConstraintValue} from "../common";
import {ConstraintTicketSet} from "../types";
import {
  ConstraintResourceSetRscLinks,
  ConstraintRowWithResourceSet,
} from "../resourceSet";

export const ConstraintRowTicketSet = ({
  constraint,
}: {
  constraint: ConstraintTicketSet;
}) => {
  return (
    <ConstraintRowWithResourceSet
      id={constraint.id}
      resourceSetList={constraint.sets}
      type="Ticket (set)"
      setCells={resourceSet => (
        <>
          <DataListCell width={4}>
            {"Resources "}
            <ConstraintResourceSetRscLinks resourceSet={resourceSet} />
            {resourceSet.role !== undefined && (
              <ConstraintResourceInRole
                role={remapDeprecatedRoles(resourceSet.role)}
              />
            )}
            {" depends on ticket "}
            <strong>{constraint.ticket}</strong>
          </DataListCell>
        </>
      )}
      content={
        <ConstraintValue
          label="Loss policy"
          value={constraint["loss-policy"]}
        />
      }
    />
  );
};
