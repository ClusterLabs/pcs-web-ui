import {DataListCell} from "@patternfly/react-core";

import {remapDeprecatedRoles} from "app/store";

import {
  ConstraintCell,
  ConstraintLink,
  ConstraintResourceInRole,
  ConstraintRow,
  ConstraintValue,
} from "../common";
import {ConstraintLocationNode} from "../types";

import {ConstraintLocationDescRscPoint} from "./ConstraintLocationDescRscPoint";

export const ConstraintRowLocationNode = ({
  constraint,
}: {
  constraint: ConstraintLocationNode;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location" width={1} />
          <DataListCell width={3}>
            <ConstraintLocationDescRscPoint constraint={constraint} />
            <ConstraintResourceInRole
              role={remapDeprecatedRoles(constraint.role)}
            />
            {" on node "}
            <ConstraintLink type="node" id={constraint.node} />
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
