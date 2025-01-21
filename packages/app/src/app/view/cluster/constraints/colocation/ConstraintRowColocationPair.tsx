import {DataListCell} from "@patternfly/react-core";

import {remapDeprecatedRoles} from "app/store";

import type {ConstraintColocationPair} from "../types";
import {
  ConstraintCell,
  ConstraintLink,
  ConstraintResourceInRole,
  ConstraintRow,
  ConstraintValue,
} from "../common";

import {ConstraintRowColocationTogether} from "./ConstraintRowColocationTogether";

export const ConstraintRowColocationPair = ({
  constraint,
}: {
  constraint: ConstraintColocationPair;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Colocation" width={1} />
          <DataListCell width={3}>
            {"Resources "}

            <ConstraintLink type="resource" id={constraint.rsc} />
            <ConstraintResourceInRole
              role={remapDeprecatedRoles(constraint["rsc-role"])}
            />

            {" and "}

            <ConstraintLink type="resource" id={constraint["with-rsc"]} />
            <ConstraintResourceInRole
              role={remapDeprecatedRoles(constraint["with-rsc-role"])}
            />

            <ConstraintRowColocationTogether constraint={constraint} />
          </DataListCell>

          <ConstraintCell label="Score" value={constraint.score} width={1} />
        </>
      }
      content={
        <ConstraintValue
          label="Node attribute"
          value={constraint["node-attribute"]}
        />
      }
    />
  );
};
