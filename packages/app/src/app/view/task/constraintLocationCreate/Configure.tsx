import {Flex, FlexItem, Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  FormError,
  FormGroup,
  FormSelectOrText,
  FormText,
  Radio,
  SelectSimple,
} from "app/view/share";

import {useTask} from "./useTask";

const {constraintLocationCreate: task} = testMarks.task;

export const Configure = () => {
  const {
    updateState,
    isScoreValid,
    isResourceValid,
    isPatternValid,
    isRuleValid,
    state: {
      resourceIdList,
      nodeNameList,
      resourceSpecification,
      resourceId,
      resourcePattern,
      locationSpecification,
      nodeName,
      rule,
      preference,
      score,
      showValidationErrors,
    },
  } = useTask();

  return (
    <Form>
      <FormGroup
        label="Resource"
        isRequired
        fieldId="constraint-location-create-resource"
      >
        <FormSelectOrText
          id="constraint-location-create-resource"
          checked={resourceSpecification === "resource" ? "select" : "text"}
          onChange={checked =>
            updateState({
              resourceSpecification:
                checked === "select" ? "resource" : "pattern",
            })
          }
          selectLabel="Select a resource"
          select={
            <>
              <SelectSimple
                id="select-resource"
                placeholderText="Select a resource"
                selected={resourceId}
                offeredOptions={resourceIdList}
                onSelect={value => updateState({resourceId: value.toString()})}
                {...task.target.resource.mark}
              />
              {showValidationErrors && !isResourceValid && (
                <FormError errorText="Please, select a resource" />
              )}
            </>
          }
          textLabel="Type resource pattern"
          text={
            <FormText
              id="type-resource-pattern"
              value={resourcePattern}
              onChange={value => updateState({resourcePattern: value})}
              helperTextInvalid="Please provide resource pattern"
              isValid={isPatternValid}
              {...task.target.pattern.mark}
            />
          }
          {...task.target.mark}
        />
      </FormGroup>

      <FormGroup
        label="Node"
        isRequired
        fieldId="constraint-location-create-node"
      >
        <FormSelectOrText
          id="constraint-location-create-location"
          checked={locationSpecification === "node" ? "select" : "text"}
          onChange={checked =>
            updateState({
              locationSpecification: checked === "select" ? "node" : "rule",
            })
          }
          selectLabel="Select a node"
          select={
            <>
              <SelectSimple
                id="selectNode"
                placeholderText="Select a node"
                selected={nodeName}
                offeredOptions={nodeNameList}
                onSelect={value => updateState({nodeName: value.toString()})}
                {...task.location.node.mark}
              />
              {showValidationErrors && !isResourceValid && (
                <FormError errorText="Please, select a node" />
              )}
            </>
          }
          textLabel="Type a rule"
          text={
            <FormText
              id="type-a-rule"
              value={rule}
              onChange={value => updateState({rule: value})}
              helperTextInvalid={"Please provide rule"}
              isValid={isRuleValid}
              {...task.location.rule.mark}
            />
          }
          {...task.location.mark}
        />
      </FormGroup>

      <FormGroup
        label="Preference"
        isRequired
        fieldId="constraint-location-create-preference"
      >
        <Flex {...task.preference.mark}>
          <FlexItem>
            <Radio
              isChecked={preference === "prefer"}
              name="preference-prefer"
              onChange={isChecked =>
                updateState({preference: isChecked ? "prefer" : "avoid"})
              }
              label="Prefer"
              id="preference-prefer"
            />
          </FlexItem>
          <FlexItem>
            <Radio
              isChecked={preference === "avoid"}
              name="preference-avoid"
              onChange={isChecked =>
                updateState({preference: isChecked ? "avoid" : "prefer"})
              }
              label="Avoid"
              id="preference-avoid"
            />
          </FlexItem>
        </Flex>
      </FormGroup>

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
  );
};
