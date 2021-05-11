import React from "react";
import {
  Flex,
  FlexItem,
  Form,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { FormGroup, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    isCustomIdValid,
    state: { id, reports, useCustomId, showValidationErrors },
  } = useTask();

  const customIdValid =
    showValidationErrors && !isCustomIdValid ? "error" : "default";

  console.log(customIdValid);
  const useCustomIdId = "use-custom-id";
  return (
    <TaskLibStep title="Order constraint options" reports={reports}>
      <Form isHorizontal>
        <FormGroup
          fieldId={useCustomIdId}
          label="Use custom id"
          helperTextInvalid={"Please provide a value of custom id"}
          validated={customIdValid}
          popover={{
            header: "Constraint id",
            body: (
              <>
                You can specify constraint id. Otherwise it will be generated
                automatically.
              </>
            ),
          }}
        >
          <Flex>
            <FlexItem className="pf-u-pt-sm">
              <Switch
                id={useCustomIdId}
                isChecked={useCustomId}
                onChange={value => updateState({ useCustomId: value })}
              />
            </FlexItem>
            {useCustomId && (
              <FlexItem>
                <TextInput
                  id={`${useCustomIdId}-id`}
                  value={id}
                  type="text"
                  onChange={value => updateState({ id: value })}
                  validated={customIdValid}
                />
              </FlexItem>
            )}
          </Flex>
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};
