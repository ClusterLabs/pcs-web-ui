import {Form} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FormGroup, FormRadios, FormText, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Advanced = () => {
  const {
    updateState,
    isConstraintLifetimeConsistent,
    state: {
      constraintHandling,
      constraintLifetime,
      showValidationErrors,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep
      title="Advanced settings"
      reports={reports}
      {...testMarks.task.resourceMove.mark}
    >
      <Form>
        <FormGroup fieldId="settings-constraint-handling">
          <FormRadios
            id="settings-constraint-handling"
            label="Constraint handling"
            options={["autoclean", "expire", "keep"]}
            selected={constraintHandling}
            onChange={value => updateState({constraintHandling: value})}
            popover={{
              header: <>Constraint handling</>,
              body: (
                <>
                  Move the resource off the node it is currently running on is
                  achieved by creating a location constraint and there are 3
                  options to deal with it:
                  <dl>
                    <dd>
                      <strong>autoclean</strong>
                    </dd>
                    <dt>
                      The constraint is deleted once the resource is running on
                      its new location.
                    </dt>
                    <dd>
                      <strong>expire</strong>
                    </dd>
                    <dt>
                      The constraint will expire after some period. Constraint
                      needs to be cleared manually. A lifetime must be specified
                      for this option.
                    </dt>
                    <dd>
                      <strong>keep</strong>
                    </dd>
                    <dt>
                      The constraint will not expire and needs to be cleared
                      manually.
                    </dt>
                  </dl>
                </>
              ),
            }}
          />
        </FormGroup>
        {constraintHandling === "expire" && (
          <FormText
            id="settings-constraint-lifetime"
            label="Constraint lifetime"
            onChange={value => updateState({constraintLifetime: value})}
            value={constraintLifetime}
            placeholder="e.g. P23DT23H"
            showValidationErrors={showValidationErrors}
            isValid={isConstraintLifetimeConsistent}
            helperTextInvalid="Please specify a valid lifetime"
            popover={{
              header: <>Lifetime</>,
              body: (
                <>
                  <p>
                    Lifetime is expected to be specified as ISO 8601 duration.
                  </p>
                  <p>
                    <strong>Format:</strong>
                  </p>
                  <p>
                    <code>P[n]Y[n]M[n]DT[n]H[n]M[n]S</code>
                  </p>
                  <p>or</p>
                  <p>
                    <code>P[n]W</code>
                  </p>
                  <p>
                    <strong>Examples:</strong>
                  </p>
                  <ul
                    style={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    <li>
                      <code>P3Y6M4DT12H30M5S</code> represents a duration of
                      three years, six months, four days, twelve hours, thirty
                      minutes, and five seconds
                    </li>
                    <li>
                      <code>P3Y6M4DT12H30M5S</code> represents a duration of
                      three years, six months, four days, twelve hours, thirty
                      minutes, and five seconds
                    </li>
                    <li>
                      <code>P1M</code> is a one-month duration
                    </li>
                    <li>
                      <code>PT1M</code> is a one-minute duration
                    </li>
                    <li>
                      <code>P2W</code> is a two-weeks duration
                    </li>
                  </ul>
                  <p style={{marginTop: "1em"}}>
                    For more information see{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/ISO_8601#Durations"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://en.wikipedia.org/wiki/ISO_8601#Durations
                    </a>
                  </p>
                </>
              ),
            }}
          />
        )}
      </Form>
    </TaskLibStep>
  );
};
