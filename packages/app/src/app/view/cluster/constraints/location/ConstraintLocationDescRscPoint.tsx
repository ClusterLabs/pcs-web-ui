// import { types } from "app/store";

import {ConstraintLink} from "../common";
import type {ConstraintLocationNode, ConstraintLocationRule} from "../types";

export const ConstraintLocationDescRscPoint = ({
  constraint,
}: {
  constraint: ConstraintLocationRule | ConstraintLocationNode;
}) => {
  if ("rsc" in constraint) {
    return (
      <>
        {"Resource "}
        <ConstraintLink type="resource" id={constraint.rsc} />
      </>
    );
  }
  return (
    <>
      {"Resources matching "}
      <strong>{constraint["rsc-pattern"]}</strong>
    </>
  );
};
