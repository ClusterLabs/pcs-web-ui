import React from "react";
import {
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { useTask } from "./useTask";
import { ResourceSet } from "./ResourceSet";

export const ResourceSetList: React.FC = () => {
  const {
    state: { sets },
    createSet,
    updateSet,
    deleteSet,
  } = useTask();
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
                      <ResourceSet
                        set={set}
                        id={`resource-set-${i}`}
                        update={updateSet(i)}
                        isOnlyOne={sets.length === 1}
                      />
                    </DataListCell>,
                  ]}
                />
                {sets.length > 1 && (
                  <DataListAction
                    id="add"
                    aria-label="remove"
                    aria-labelledby={`resource-set-${i}`}
                  >
                    <Button variant="secondary" onClick={() => deleteSet(i)}>
                      -
                    </Button>
                  </DataListAction>
                )}
              </DataListItemRow>
            </DataListItem>
          );
        })}
      </DataList>

      <Button variant="primary" onClick={createSet} className="pf-u-mt-sm">
        +
      </Button>
    </>
  );
};
