import React from "react";
import { Flex, FlexItem, Form, FormGroup, Radio } from "@patternfly/react-core";

import { FormSelectOrText, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure: React.FC = () => {
  const {
    updateState,
    nodeNameList,
    resourceIdList,
    isScoreValid,
    isResourceValid,
    isPatternValid,
    isNodeValid,
    isRuleValid,
    state: {
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
    <Form data-test="create-location-constrait">
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
          showValidationErrors={showValidationErrors}
          select={{
            label: "Select a resource",
            placeholderText: "Select a resource",
            isValid: isResourceValid,
            selections: resourceId,
            optionsValues: resourceIdList,
            onSelect: value => updateState({ resourceId: value.toString() }),
          }}
          text={{
            label: "Type resource pattern",
            value: resourcePattern,
            onChange: value => updateState({ resourcePattern: value }),
            helperTextInvalid: "Please provide resource pattern",
            isValid: isPatternValid,
            "data-test": "resource-pattern",
          }}
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
          showValidationErrors={showValidationErrors}
          select={{
            label: "Select a node",
            placeholderText: "Select a node",
            isValid: isNodeValid,
            selections: nodeName,
            optionsValues: nodeNameList,
            onSelect: value => updateState({ nodeName: value.toString() }),
          }}
          text={{
            label: "Type rule",
            value: rule,
            onChange: value => updateState({ rule: value }),
            helperTextInvalid: "Please provide rule",
            isValid: isRuleValid,
            "data-test": "rule",
          }}
        />
      </FormGroup>

      <FormGroup
        label="Preference"
        isRequired
        fieldId="constraint-location-create-preference"
      >
        <Flex>
          <FlexItem>
            <Radio
              isChecked={preference === "prefer"}
              name="preference-prefer"
              onChange={isChecked =>
                updateState({ preference: isChecked ? "prefer" : "avoid" })
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
                updateState({ preference: isChecked ? "avoid" : "prefer" })
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
        onChange={value => updateState({ score: value })}
        value={score}
        showValidationErrors={showValidationErrors}
        isValid={isScoreValid}
        helperTextInvalid="Score must be integer or INFINITY"
        data-test="score"
      />
    </Form>
  );
};
