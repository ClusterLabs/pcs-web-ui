import {DataListCell} from "@patternfly/react-core";

import {useSelectedClusterName} from "app/view/share";

import {ConstraintLocationRule} from "../types";
import {
  ConstraintCell,
  ConstraintCellFake,
  ConstraintResourceInRole,
  ConstraintRow,
  ConstraintValue,
} from "../common";

import {ConstraintLocationDescRscPoint} from "./ConstraintLocationDescRscPoint";
import {ConstraintLocationCellScore} from "./ConstraintLocationCellScore";

const getId = (constraint: ConstraintLocationRule, uniqueId: number) => {
  if ("id" in constraint) {
    return constraint.id;
  }

  const rsc = "rsc" in constraint ? constraint.rsc : constraint["rsc-pattern"];

  return `${constraint["id-ref"]}-${rsc}-${uniqueId}`;
};

export const ConstraintRowLocationRule = ({
  constraint,
  uniqueId,
}: {
  constraint: ConstraintLocationRule;
  uniqueId: number;
}) => {
  const clusterName = useSelectedClusterName();

  return (
    <ConstraintRow
      id={getId(constraint, uniqueId)}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location (rule)" width={1} />
          {"id-ref" in constraint && (
            <>
              <DataListCell width={3}>
                <ConstraintLocationDescRscPoint constraint={constraint} />
                {" according to the rule with id "}
                <strong>{constraint["id-ref"]}</strong>
              </DataListCell>
              <ConstraintCellFake />
            </>
          )}
          {!("id-ref" in constraint) && (
            <>
              <DataListCell width={3}>
                <ConstraintLocationDescRscPoint constraint={constraint} />
                <ConstraintResourceInRole role={constraint.role} />
                {" according to the rule "}
                <strong>{constraint.rule_string}</strong>
              </DataListCell>
              <ConstraintLocationCellScore constraint={constraint} />
            </>
          )}
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Resource discovery"
            value={constraint["resource-discovery"]}
          />
        </>
      }
      canDelete={"id" in constraint}
      deleteAction={
        "id" in constraint
          ? {
              type: "CONSTRAINT.DELETE.RULE",
              key: {clusterName},
              payload: {
                ruleId: constraint.id,
              },
            }
          : undefined
      }
    />
  );
};
