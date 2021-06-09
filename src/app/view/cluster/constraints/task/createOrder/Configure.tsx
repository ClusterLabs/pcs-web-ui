import React from "react";
import {
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Form,
} from "@patternfly/react-core";
import {
  LongArrowAltDownIcon,
  LongArrowAltUpIcon,
} from "@patternfly/react-icons";

import { FormRadios, FormSelect } from "app/view/share";

import { useTask } from "./useTask";

export const Configure: React.FC = () => {
  const {
    resourceIdList,
    updateState,
    swapResources,
    isFirstResourceValid,
    isThenResourceValid,
    state: {
      firstResourceId,
      firstAction,
      thenResourceId,
      thenAction,
      showValidationErrors,
    },
  } = useTask();

  const firstResourceValidated =
    showValidationErrors && !isFirstResourceValid ? "error" : "default";
  const thenResourceValidated =
    showValidationErrors && !isThenResourceValid ? "error" : "default";
  return (
    <DataList aria-label="Resource set list">
      <DataListItem>
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="all">
                <Form>
                  <FormSelect
                    id="constraint-order-create-first-resource"
                    label="First resource"
                    placeholderText="Select a resource"
                    validated={firstResourceValidated}
                    helperTextInvalid="Please select a resource"
                    isRequired
                    onSelect={value =>
                      updateState({ firstResourceId: value.toString() })
                    }
                    selections={firstResourceId}
                    optionsValues={resourceIdList.filter(
                      r => r !== thenResourceId,
                    )}
                  />
                  <FormRadios
                    id="constraint-order-first-resource-action"
                    label="Action"
                    options={["start", "stop", "promote", "demote"]}
                    selected={firstAction}
                    onChange={value => updateState({ firstAction: value })}
                  />
                </Form>
              </DataListCell>,
            ]}
          />
          <DataListAction
            id="first-resource-action"
            aria-label="swap resources"
            aria-labelledby="first-resource-action"
          >
            <Button
              variant="link"
              className="pf-u-m-0 pf-u-p-0"
              onClick={swapResources}
              icon={<LongArrowAltDownIcon />}
            />
          </DataListAction>
        </DataListItemRow>
      </DataListItem>

      <DataListItem>
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="all">
                <Form>
                  <FormSelect
                    id="constraint-order-create-then-resource"
                    label="Then resource"
                    placeholderText="Select a resource"
                    validated={thenResourceValidated}
                    helperTextInvalid="Please select a resource"
                    isRequired
                    onSelect={value =>
                      updateState({ thenResourceId: value.toString() })
                    }
                    selections={thenResourceId}
                    optionsValues={resourceIdList.filter(
                      r => r !== firstResourceId,
                    )}
                  />
                  <FormRadios
                    id="constraint-order-then-resource-action"
                    label="Action"
                    options={["start", "stop", "promote", "demote"]}
                    selected={thenAction}
                    onChange={value => updateState({ thenAction: value })}
                  />
                </Form>
              </DataListCell>,
            ]}
          />
          <DataListAction
            id="then-resource-action"
            aria-label="swap resources"
            aria-labelledby="then-resource-action"
          >
            <Button
              variant="link"
              className="pf-u-m-0 pf-u-p-0"
              onClick={swapResources}
              icon={<LongArrowAltUpIcon />}
            />
          </DataListAction>
        </DataListItemRow>
      </DataListItem>
    </DataList>
  );
};
