import React from "react";
import { Form } from "@patternfly/react-core";

import { FormRadios, FormSwitch, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure: React.FC = () => {
  const {
    updateState,
    isNameValid,
    areCompetenciesValid,
    state: { name, type, showValidationErrors, read, write, grant, full },
  } = useTask();

  return (
    <>
      <Form data-test="permission-create">
        <FormText
          id="permission-name"
          label="Name"
          onChange={value => updateState({ name: value })}
          value={name}
          showValidationErrors={showValidationErrors}
          isValid={isNameValid}
          helperTextInvalid="Please enter a name"
          data-test="name"
        />
        <FormRadios
          label="Type"
          id="permission-user-group-type"
          options={["user", "group"]}
          selected={type}
          onChange={value =>
            updateState({
              type: value.toString() as typeof type,
            })
          }
          data-test="type"
        />
      </Form>
      <Form data-test="permission-create" isHorizontal className="pf-u-mt-md">
        <FormSwitch
          id="allow-read"
          label="Read"
          isChecked={read}
          onChange={allow => updateState({ read: allow })}
          data-test="read"
        />
        <FormSwitch
          id="allow-write"
          label="Write"
          isChecked={write}
          onChange={allow => updateState({ write: allow })}
          data-test="write"
        />
        <FormSwitch
          id="allow-grant"
          label="Grant"
          isChecked={grant}
          onChange={allow => updateState({ grant: allow })}
          data-test="grant"
        />
        <FormSwitch
          id="allow-full"
          label="Full"
          isChecked={full}
          onChange={allow => updateState({ full: allow })}
          data-test="full"
          showValidationErrors={showValidationErrors}
          isValid={areCompetenciesValid}
          helperTextInvalid="Please select at least one permission"
        />
      </Form>
    </>
  );
};
