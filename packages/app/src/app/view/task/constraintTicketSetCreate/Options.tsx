import {Form} from "@patternfly/react-core";

import {FormCustomId, FormRadios, FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Options = () => {
  const {
    updateState,
    isCustomIdValid,
    isTicketValid,
    state: {
      id,
      useCustomId,
      lossPolicy,
      showValidationErrors,
      ticket,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep title="Ticket constraint options" reports={reports}>
      <Form isHorizontal>
        <FormCustomId
          useCustomId={useCustomId}
          onChangeUse={value => updateState({useCustomId: value})}
          onChangeId={value => updateState({id: value})}
          customId={id}
          showValidationErrors={showValidationErrors}
          isValid={isCustomIdValid}
        />

        <FormText
          id="constraint-ticket"
          label="Ticket"
          onChange={value => updateState({ticket: value})}
          value={ticket}
          helperTextInvalid="Please provide ticket"
          showValidationErrors={showValidationErrors}
          isValid={isTicketValid}
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
        />

        <FormRadios
          id="constraint-ticket-set-loss-policy"
          label="Loss policy"
          options={["stop", "fence", "freeze", "demote"]}
          selected={lossPolicy}
          onChange={value => updateState({lossPolicy: value})}
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
                    Demote relevant resources that are running in promoted mode
                    to unpromoted mode.
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
