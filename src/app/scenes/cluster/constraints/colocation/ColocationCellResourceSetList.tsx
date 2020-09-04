import React from "react";
import { DataList, DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import { ColocationCellRecordSetCell } from "./ColocationCellRecordSetCell";

export const ColocationCellResourceSetList: React.FC<{
  resourceSetList: types.cluster.ConstraintResourceSet[];
  score: types.cluster.Score | undefined;
}> = ({ resourceSetList, score }) => {
  return (
    <DataListCell width={4}>
      <DataList aria-label="Colocation set">
        {resourceSetList.map((resourceSet) => {
          if ("id-ref" in resourceSet) {
            return null;
          }

          return (
            <ColocationCellRecordSetCell
              resourceSet={resourceSet}
              score={score}
            />
          );
        })}
      </DataList>
    </DataListCell>
  );
};
