import React from "react";
import {
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { ConstraintResourceSet } from "../types";
import { ConstraintCell, ConstraintRow } from "../common";

type ResourceSetStructured = Extract<ConstraintResourceSet, { id: string }>;
export const ConstraintRowWithResourceSet: React.FC<{
  resourceSetList: ConstraintResourceSet[];
  setCells: (_resourceSet: ResourceSetStructured) => React.ReactNode;
  setContent?: (_resourceSet: ResourceSetStructured) => React.ReactNode;
  type: string;
  id: string;
  content?: React.ComponentProps<typeof ConstraintRow>["content"];
}> = ({
  resourceSetList,
  type,
  id,
  setCells,
  setContent = null,
  content = null,
}) => {
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
                  return (
                    <DataListItem
                      key={`${id}-${resourceSet["id-ref"]}`}
                      aria-labelledby={`${id}-${resourceSet["id-ref"]}`}
                    >
                      <DataListItemRow>
                        <DataListItemCells
                          dataListCells={[
                            <DataListCell key="primary content">
                              {"Resource set with id "}
                              <strong>{resourceSet["id-ref"]}</strong>
                            </DataListCell>,
                          ]}
                        />
                      </DataListItemRow>
                    </DataListItem>
                  );
                }

                return (
                  <ConstraintRow
                    key={resourceSet.id}
                    id={resourceSet.id}
                    dataListCells={setCells(resourceSet)}
                    content={setContent ? setContent(resourceSet) : null}
                    canDelete={false}
                  />
                );
              })}
            </DataList>
          </DataListCell>
        </>
      }
      content={content}
    />
  );
};
