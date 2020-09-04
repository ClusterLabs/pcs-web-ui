import React from "react";
import { DataList, DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import { ConstraintCell, ConstraintRow } from "../common";

export const ConstraintRowWithResourceSet: React.FC<{
  resourceSetList: types.cluster.ConstraintResourceSet[];
  setCells: (
    resourceSet: types.cluster.ConstraintResourceSetStructured,
  ) => React.ReactNode;
  setContent?: (
    resourceSet: types.cluster.ConstraintResourceSetStructured,
  ) => JSX.Element;
  type: string;
  id: string;
}> = ({ resourceSetList, type, id, setCells, setContent = null }) => {
  return (
    <ConstraintRow
      id={id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value={type} width={1} />
          <DataListCell width={4}>
            <DataList aria-label="Constraint resource set">
              {resourceSetList.map((resourceSet) => {
                if ("id-ref" in resourceSet) {
                  return null;
                }

                return (
                  <ConstraintRow
                    id={resourceSet.id}
                    dataListCells={setCells(resourceSet)}
                    content={setContent ? setContent(resourceSet) : null}
                  />
                );
              })}
            </DataList>
          </DataListCell>
        </>
      }
    />
  );
};
