import React from "react";

import { types } from "app/store";

import { ConstraintLink } from "../common";

type ResourceSetStructured = Extract<
  types.cluster.ConstraintResourceSet,
  { id: string }
>;

export const ConstraintResourceSetRscLinks: React.FC<{
  resourceSet: ResourceSetStructured;
}> = ({ resourceSet }) => {
  return (
    <>
      {resourceSet.resources
        .map<React.ReactNode>(resourceId => (
          <ConstraintLink key={resourceId} type="resource" id={resourceId} />
        ))
        .reduce((prev, curr) => [prev, ", ", curr])}
    </>
  );
};
