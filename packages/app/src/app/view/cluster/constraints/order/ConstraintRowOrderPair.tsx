import React from "react";
import {DataListCell} from "@patternfly/react-core";

import {
  ConstraintCell,
  ConstraintLink,
  ConstraintRow,
  ConstraintValue,
} from "../common";
import type {ConstraintOrderPair} from "../types";

import {ConstraintCellOrderScoreKind} from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrderPair = ({
  constraint,
}: {
  constraint: ConstraintOrderPair;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Order" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <ConstraintLink type="resource" id={constraint.first} />
            <strong>
              {` ${constraint["first-action"] || "start"}s before `}
            </strong>
            {"resource "}
            <ConstraintLink type="resource" id={constraint.then} />
            <strong>
              {` ${
                constraint["then-action"] ||
                constraint["first-action"] ||
                "start"
              }s`}
            </strong>
          </DataListCell>
          <ConstraintCellOrderScoreKind constraint={constraint} />
        </>
      }
      content={
        <>
          <ConstraintValue label="Symmetrical" value={constraint.symmetrical} />
          <ConstraintValue
            label="Require all"
            value={constraint["require-all"]}
          />
        </>
      }
    />
  );
};
