import React from "react";
import { DataList } from "@patternfly/react-core";

import { types } from "app/store";

import { ConstraintResourceSetRow } from "./ConstraintResourceSetRow";

export const ConstraintResourceSetList = ({
  resourceSetList,
}: {
  resourceSetList: types.cluster.ConstraintResourceSet[];
}) => {
  return (
    <DataList aria-label="Resource set">
      {resourceSetList.map(resourceSet => (
        <ConstraintResourceSetRow
          key={"id" in resourceSet ? resourceSet.id : resourceSet["id-ref"]}
          resourceSet={resourceSet}
        />
      ))}
    </DataList>
  );
};
