import React from "react";
import {
  Flex,
  FlexItem,
  Form,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { FormGroup, FormRadios, FormSelect, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure: React.FC = () => {
  const {
    updateState,
    resourceIdList,
    isCustomIdValid,
    isTicketValid,
    isResourceValid,
    state: {
      ticket,
      resourceId,
      lossPolicy,
      useCustomId,
      showValidationErrors,
      id,
      role,
    },
  } = useTask();

  const useCustomIdId = "use-custom-id";
  const ticketValid =
    showValidationErrors && !isTicketValid ? "error" : "default";
  const customIdValid =
    showValidationErrors && !isCustomIdValid ? "error" : "default";
  const resourceValid =
    showValidationErrors && !isResourceValid ? "error" : "default";

  return (
    <Form data-test="create-location-constrait">
      <FormText
        id="constraint-ticket"
        label="Ticket"
        onChange={value => updateState({ ticket: value })}
        value={ticket}
        helperTextInvalid="Please provide ticket"
        validated={ticketValid}
        isRequired
        popover={{
          header: "Ticket",
          body: (
            <>
              A ticket grants the right to run certain resources on a specific
              cluster site. Only if the ticket is available at a site can the
              respective resources be started there. Vice versa, if the ticket
              is revoked, the resources depending on that ticket must be
              stopped.
            </>
          ),
        }}
        data-test="score"
      />

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

      <FormSelect
        id={"constraint-ticket-create-resource"}
        label="Resource"
        placeholderText="Select a resource"
        validated={resourceValid}
        helperTextInvalid="Please select a resource"
        isRequired
        onSelect={value => updateState({ resourceId: value.toString() })}
        selections={resourceId}
        optionsValues={resourceIdList}
      />

      <FormRadios
        label="Role"
        className="pf-u-mt-sm"
        id="role"
        options={["no limitation", "Started", "Stopped", "Master", "Slave"]}
        selected={role}
        onChange={value => updateState({ role: value })}
        popover={{
          header: "Role",
          body: <>Limit the effect of the constraint to the specified role.</>,
        }}
      />

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
  );
};
