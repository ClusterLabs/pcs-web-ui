import React from "react";
import { Form } from "@patternfly/react-core";

import { FormRadios, FormSelect, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure: React.FC = () => {
  const {
    updateState,
    resourceIdList,
    isResourceValid,
    isWithResourceValid,
    state: {
      resourceId,
      withResourceId,
      placement,
      score,
      showValidationErrors,
    },
  } = useTask();

  const resourceValidated =
    showValidationErrors && !isResourceValid ? "error" : "default";
  const withResourceValidated =
    showValidationErrors && !isWithResourceValid ? "error" : "default";

  return (
    <Form data-test="create-location-constrait">
      <FormSelect
        id={"constraint-colocation-create-resource"}
        label="Resource"
        placeholderText="Select a resource"
        validated={resourceValidated}
        helperTextInvalid="Please select a resource"
        isRequired
        onSelect={value => updateState({ resourceId: value.toString() })}
        selections={resourceId}
        optionsValues={resourceIdList.filter(r => r !== withResourceId)}
      />

      <FormSelect
        id={"constraint-colocation-create-resource"}
        label="With resource"
        placeholderText="Select a resource"
        validated={withResourceValidated}
        helperTextInvalid="Please select a resource"
        isRequired
        onSelect={value => updateState({ withResourceId: value.toString() })}
        selections={withResourceId}
        optionsValues={resourceIdList.filter(r => r !== resourceId)}
      />

      <FormRadios
        id="constraint-colocation-create-placement"
        label="Placement"
        options={["together", "apart"]}
        selected={placement}
        onChange={value => updateState({ placement: value })}
      />

      <FormText
        id="constraint-score"
        label="Score"
        onChange={value => updateState({ score: value })}
        value={score}
        helperTextInvalid="Please provide score"
        isRequired
        data-test="score"
      />
    </Form>
  );
};
