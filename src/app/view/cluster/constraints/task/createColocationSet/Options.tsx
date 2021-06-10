import React from "react";
import { Form } from "@patternfly/react-core";

import {
  FormCustomId,
  FormRadios,
  FormText,
  TaskLibStep,
} from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    isCustomIdValid,
    isScoreValid,
    state: {
      id,
      useCustomId,
      showValidationErrors,
      placement,
      score,
      libCall: { reports },
    },
  } = useTask();

  const scoreValidated =
    showValidationErrors && !isScoreValid ? "error" : "default";

  return (
    <TaskLibStep title="Colocation constraint options" reports={reports}>
      <Form isHorizontal>
        <FormCustomId
          useCustomId={useCustomId}
          onChangeUse={value => updateState({ useCustomId: value })}
          onChangeId={value => updateState({ id: value })}
          customId={id}
          showError={showValidationErrors && !isCustomIdValid}
        />

        <FormRadios
          id="constraint-colocation-create-placement"
          label="Placement"
          options={["together", "apart"]}
          selected={placement}
          onChange={value => updateState({ placement: value })}
        />

        <FormText
          label="Score"
          id="score"
          value={score}
          validated={scoreValidated}
          helperTextInvalid="Score must be integer or INFINITY"
          onChange={value => updateState({ score: value })}
        />
      </Form>
    </TaskLibStep>
  );
};
