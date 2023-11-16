import {FormText} from "app/view/share";
import {testMarks} from "app/view/dataTest";

import {useTask} from "./useTask";

const {resourceMove: task} = testMarks.task;

export const AdvancedLifetime = () => {
  const {
    updateState,
    isConstraintLifetimeConsistent,
    state: {constraintLifetime, showValidationErrors},
  } = useTask();
  return (
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
            <p>Lifetime is expected to be specified as ISO 8601 duration.</p>
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
                <code>P3Y6M4DT12H30M5S</code> represents a duration of three
                years, six months, four days, twelve hours, thirty minutes, and
                five seconds
              </li>
              <li>
                <code>P3Y6M4DT12H30M5S</code> represents a duration of three
                years, six months, four days, twelve hours, thirty minutes, and
                five seconds
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
      {...task.advanced.constraintLifetime.mark}
    />
  );
};
