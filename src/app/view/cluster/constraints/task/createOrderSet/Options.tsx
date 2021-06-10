import React from "react";
import { Form } from "@patternfly/react-core";

import { FormCustomId, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    isCustomIdValid,
    state: {
      id,
      libCall: { reports },
      useCustomId,
      showValidationErrors,
    },
  } = useTask();

  return (
    <TaskLibStep title="Order constraint options" reports={reports}>
      <Form isHorizontal>
        <FormCustomId
          useCustomId={useCustomId}
          onChangeUse={value => updateState({ useCustomId: value })}
          onChangeId={value => updateState({ id: value })}
          customId={id}
          showError={showValidationErrors && !isCustomIdValid}
        />
      </Form>
    </TaskLibStep>
  );
};
