import React from "react";
import {
  Flex,
  FlexItem,
  Form,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { FormGroup, FormRadios, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    isCustomIdValid,
    state: { id, useCustomId, reports, lossPolicy, showValidationErrors },
  } = useTask();
  const useCustomIdId = "use-custom-id";
  const customIdValid =
    showValidationErrors && !isCustomIdValid ? "error" : "default";
  return (
    <TaskLibStep title="Ticket constraint options" reports={reports}>
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
        <FormRadios
          id="constraint-ticket-set-loss-policy"
          label="Loss policy"
          options={["stop", "fence", "freeze", "demote"]}
          selected={lossPolicy}
          onChange={value => updateState({ lossPolicy: value })}
          popover={{
            header: (
              <>
                Defines what should happen to the respective resources if the
                ticket is revoked
              </>
            ),
            body: (
              <>
                Allowed values:
                <dl>
                  <dd>
                    <strong>fence</strong>
                  </dd>
                  <dt>
                    Fence the nodes that are running the relevant resources.
                  </dt>
                  <dd>
                    <strong>stop</strong>
                  </dd>
                  <dt>Stop the relevant resources.</dt>
                  <dd>
                    <strong>freeze</strong>
                  </dd>
                  <dt>Do nothing to the relevant resources.</dt>
                  <dd>
                    <strong>demote</strong>
                  </dd>
                  <dt>
                    Demote relevant resources that are running in master mode to
                    slave mode.
                  </dt>
                </dl>
              </>
            ),
          }}
        />
      </Form>
    </TaskLibStep>
  );
};
