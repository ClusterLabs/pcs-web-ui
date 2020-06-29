import React from "react";

import { types } from "app/store";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";
import { ConstraintLocationCellRscPoint } from "./ConstraintLocationCellRscPoint";

export const ConstraintRowLocationRule = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintLocationRule;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location (rule)" />
          <ConstraintCell label="Rule" value={constraint.rule_string} />
          <ConstraintLocationCellRscPoint constraint={constraint} />
          {"id-ref" in constraint && (
            <ConstraintCell
              label="Referenced Id"
              value={constraint["id-ref"]}
            />
          )}
          {"score" in constraint && (
            <ConstraintCell label="Score" value={constraint.score} />
          )}
          {"score-attribute" in constraint && (
            <ConstraintCell
              label="Score attribute"
              value={constraint["score-attribute"]}
            />
          )}
        </>
      }
      content={
        "id-ref" in constraint ? null : (
          <ConstraintValue label="Role" value={constraint.role} />
        )
      }
    />
  );
};
