import { DataListCell } from "@patternfly/react-core";

import { ConstraintColocationSet } from "../types";
import { ConstraintResourceInRole, ConstraintValue } from "../common";
import {
  ConstraintResourceSetRscLinks,
  ConstraintRowWithResourceSet,
} from "../resourceSet";

import { ConstraintRowColocationTogether } from "./ConstraintRowColocationTogether";

export const ConstraintRowColocationSet = ({
  constraint,
}: {
  constraint: ConstraintColocationSet;
}) => {
  return (
    <ConstraintRowWithResourceSet
      id={constraint.id}
      resourceSetList={constraint.sets}
      type="Colocation (set)"
      setCells={resourceSet => (
        <>
          <DataListCell width={4}>
            {"Resources "}
            <ConstraintResourceSetRscLinks resourceSet={resourceSet} />
            <ConstraintResourceInRole role={resourceSet.role} />
            <ConstraintRowColocationTogether constraint={constraint} />
          </DataListCell>
          <DataListCell width={1}>
            {"Score "}
            <strong>
              {resourceSet.score || constraint.score || "default"}
            </strong>
          </DataListCell>
        </>
      )}
      setContent={resourceSet => (
        <ConstraintValue label="Sequential" value={resourceSet.sequential} />
      )}
    />
  );
};
