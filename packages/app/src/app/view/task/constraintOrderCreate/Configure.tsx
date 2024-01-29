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

import {testMarks} from "app/view/dataTest";
import {FormRadios, FormSelectSimple, FormText} from "app/view/share";

import {useTask} from "./useTask";

const {constraintOrderCreate: task} = testMarks.task;
export const Configure = () => {
  const {
    updateState,
    swapResources,
    isFirstResourceValid,
    isThenResourceValid,
    isScoreValid,
    state: {
      resourceIdList,
      firstResourceId,
      firstAction,
      thenResourceId,
      thenAction,
      score,
      showValidationErrors,
    },
  } = useTask();

  return (
    <>
      <DataList aria-label="Resource set list">
        <DataListItem>
          <DataListItemRow>
            <DataListItemCells
              dataListCells={[
                <DataListCell key="all">
                  <Form {...task.first.mark}>
                    <FormSelectSimple
                      id="constraint-order-create-first-resource"
                      label="First resource"
                      placeholderText="Select a resource"
                      showValidationErrors={showValidationErrors}
                      isValid={isFirstResourceValid}
                      helperTextInvalid="Please select a resource"
                      isRequired
                      onSelect={value =>
                        updateState({firstResourceId: value.toString()})
                      }
                      selected={firstResourceId}
                      offeredOptions={resourceIdList.filter(
                        r => r !== thenResourceId,
                      )}
                      {...task.first.resource.mark}
                    />
                    <FormRadios
                      id="constraint-order-first-resource-action"
                      label="Action"
                      options={["start", "stop", "promote", "demote"]}
                      selected={firstAction}
                      onChange={value => updateState({firstAction: value})}
                      {...task.first.action.mark}
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
                className="pf-v5-u-m-0 pf-v5-u-p-0"
                onClick={swapResources}
                icon={<LongArrowAltDownIcon />}
                {...task.first.down.mark}
              />
            </DataListAction>
          </DataListItemRow>
        </DataListItem>

        <DataListItem>
          <DataListItemRow>
            <DataListItemCells
              dataListCells={[
                <DataListCell key="all">
                  <Form {...task.then.mark}>
                    <FormSelectSimple
                      id="constraint-order-create-then-resource"
                      label="Then resource"
                      placeholderText="Select a resource"
                      showValidationErrors={showValidationErrors}
                      isValid={isThenResourceValid}
                      helperTextInvalid="Please select a resource"
                      isRequired
                      onSelect={value =>
                        updateState({thenResourceId: value.toString()})
                      }
                      selected={thenResourceId}
                      offeredOptions={resourceIdList.filter(
                        r => r !== firstResourceId,
                      )}
                      {...task.then.resource.mark}
                    />
                    <FormRadios
                      id="constraint-order-then-resource-action"
                      label="Action"
                      options={["start", "stop", "promote", "demote"]}
                      selected={thenAction}
                      onChange={value => updateState({thenAction: value})}
                      {...task.then.action.mark}
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
                {...task.then.up.mark}
              />
            </DataListAction>
          </DataListItemRow>
        </DataListItem>
      </DataList>
      <Form>
        <FormText
          id="constraint-score"
          label="Score"
          onChange={value => updateState({score: value})}
          value={score}
          showValidationErrors={showValidationErrors}
          isValid={isScoreValid}
          helperTextInvalid="Score must be integer or INFINITY"
          {...task.score.mark}
        />
      </Form>
    </>
  );
};
