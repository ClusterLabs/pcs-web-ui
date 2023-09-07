import {Form} from "@patternfly/react-core";

import {FormText} from "app/view/share";

import {useTask} from "./useTask";

export const Configure = () => {
  const {
    updateState,
    isValueValid,
    integerIsExpectedAsValue,
    isNameValid,
    isNameUsed,
    state: {value, showValidationErrors, type, name},
  } = useTask();
  return (
    <Form data-test="nvpair-create">
      <FormText
        id="attr-name"
        label="Name"
        onChange={value => updateState({name: value})}
        value={name}
        showValidationErrors={showValidationErrors}
        isValid={isNameValid && (type === "update" || !isNameUsed)}
        helperTextInvalid={
          !isNameValid
            ? "Please enter attribute name"
            : "Attribute with this name already exists"
        }
        isDisabled={type === "update"}
        data-test="name"
      />
      <FormText
        id="attr-value"
        label="Value"
        onChange={value => updateState({value})}
        value={value}
        showValidationErrors={showValidationErrors}
        isValid={isValueValid}
        helperTextInvalid={
          integerIsExpectedAsValue
            ? "Please enter a non zero integer"
            : "Please enter a value"
        }
        data-test="value"
      />
    </Form>
  );
};
