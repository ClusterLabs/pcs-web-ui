import React from "react";
import {DataListCell} from "@patternfly/react-core";

import {
  ConstraintResourceSetRscLinks,
  ConstraintRowWithResourceSet,
} from "../resourceSet";
import {ConstraintValue} from "../common";
import type {ConstraintOrderSet} from "../types";

import {ConstraintCellOrderScoreKind} from "./ConstraintCellOrderScoreKind";

export const ConstraintRowOrderSet = ({
  constraint,
}: {
  constraint: ConstraintOrderSet;
}) => {
  return (
    <ConstraintRowWithResourceSet
      id={constraint.id}
      resourceSetList={constraint.sets}
      type="Order (set)"
      setCells={resourceSet => (
        <>
          <DataListCell width={4}>
            {"Resources "}
            <ConstraintResourceSetRscLinks resourceSet={resourceSet} />
            <strong>{` ${resourceSet.action || "start"}`}</strong>
            {" in given order"}
          </DataListCell>
          <ConstraintCellOrderScoreKind
            constraint={constraint}
            extraScore={resourceSet.score}
          />
        </>
      )}
      setContent={resourceSet => (
        <>
          <ConstraintValue
            label="Sequential"
            value={resourceSet.sequential || constraint.symmetrical || "true"}
          />
          <ConstraintValue
            label="Require all"
            value={
              resourceSet["require-all"] || constraint["require-all"] || "true"
            }
          />
        </>
      )}
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
