import React from "react";
import {
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Title,
} from "@patternfly/react-core";
import {
  LongArrowAltDownIcon,
  LongArrowAltUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@patternfly/react-icons";

export const ResourceSetList = <SET extends { resources: string[] }>({
  sets,
  createSet,
  deleteSet,
  moveSet,
  children,
}: {
  sets: SET[];
  createSet: () => void;
  deleteSet: (i: number) => void;
  moveSet: (i: number, direction: "up" | "down") => void;
  children: (settings: { set: SET; i: number }) => React.ReactNode;
}) => {
  return (
    <>
      <DataList aria-label="Resource set list">
        {sets.map((set, i) => {
          return (
            <DataListItem key={i}>
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="all">
                      <Title headingLevel="h3" size="lg" className="pf-u-mb-md">
                        Resource set {i + 1}
                      </Title>

                      {children({ set, i })}
                    </DataListCell>,
                  ]}
                />
                {sets.length > 1 && (
                  <DataListAction
                    id="add"
                    aria-label="remove"
                    aria-labelledby={`resource-set-${i}`}
                  >
                    <Button
                      variant="link"
                      className="pf-u-m-0 pf-u-p-0"
                      onClick={() => deleteSet(i)}
                      icon={<TrashIcon />}
                    />
                    {i > 0 && (
                      <Button
                        variant="link"
                        className="pf-u-m-0 pf-u-p-0"
                        onClick={() => moveSet(i, "up")}
                        icon={<LongArrowAltUpIcon />}
                      />
                    )}
                    {i < sets.length - 1 && (
                      <Button
                        variant="link"
                        className="pf-u-m-0 pf-u-p-0"
                        onClick={() => moveSet(i, "down")}
                        icon={<LongArrowAltDownIcon />}
                      />
                    )}
                  </DataListAction>
                )}
              </DataListItemRow>
            </DataListItem>
          );
        })}
      </DataList>

      <Button
        variant="primary"
        onClick={createSet}
        icon={<PlusCircleIcon />}
        className="pf-u-mt-sm"
      >
        Add resource set
      </Button>
    </>
  );
};
