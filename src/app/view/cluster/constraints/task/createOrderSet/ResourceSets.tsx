import React from "react";
import {
  ActionGroup,
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Form,
} from "@patternfly/react-core";

import { useTask } from "./useTask";

export const ResourceSets: React.FC = () => {
  const {
    state: { sets },
    createSet,
    deleteSet,
  } = useTask();
  return (
    <Form>
      <DataList aria-label="Resource set list">
        {sets.map((s, i) => (
          <DataListItem key={i}>
            <DataListItemRow>
              <DataListItemCells
                id={`resource-set-${i}`}
                dataListCells={[
                  <DataListCell key="resources">
                    {`Resources ${s.resources.length}`}
                  </DataListCell>,
                ]}
              />
              <DataListAction
                id="add"
                aria-label="remove"
                aria-labelledby={`resource-set-${i}`}
              >
                {sets.length > 1 && (
                  <Button variant="secondary" onClick={() => deleteSet(i)}>
                    -
                  </Button>
                )}
              </DataListAction>
            </DataListItemRow>
          </DataListItem>
        ))}
      </DataList>
      <ActionGroup>
        <Button variant="primary" onClick={createSet}>
          +
        </Button>
      </ActionGroup>
    </Form>
  );
};
