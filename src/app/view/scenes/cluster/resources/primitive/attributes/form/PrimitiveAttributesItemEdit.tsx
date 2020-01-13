import React from "react";
import {
  Alert,
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";

import AttributeDecisionFormGroup from "./AttributeDecisionFormGroup";
import AttributeDecisionRadio from "./AttributeDecisionRadio";


const PrimitiveAttributesItemEdit = ({
  label,
  userValue,
  initialValue,
  remoteValue,
  onChange,
}: {
  label: string;
  userValue: string;
  initialValue: string;
  remoteValue: string;
  onChange: (key: string, value: string) => void;
}) => {
  const id = `resource-attribute-${label}`;
  return (
    <AttributeDecisionFormGroup label={label}>
      <Stack>
        {remoteValue !== initialValue && (
          <>
            <StackItem className="pf-u-mb-sm">
              <Alert
                variant="warning"
                isInline
                title="Another user provided a new value for this field."
              />
            </StackItem>
            <StackItem className="pf-u-mt-sm">
              <AttributeDecisionRadio
                id={`remote-value-${label}`}
                name={label}
                ariaLabel={`Use concurent value: ${remoteValue}`}
                value={remoteValue}
              >
                <label
                  className="pf-c-radio__label"
                  htmlFor={`remote-value-${label}`}
                >
                  Use the new value
                </label>
                <br />
                <strong>{remoteValue}</strong>
              </AttributeDecisionRadio>
            </StackItem>
          </>
        )}
        <StackItem className="pf-u-mt-sm">
          <div className={remoteValue !== initialValue ? "pf-c-radio ha-c-radio" : ""}>
            {remoteValue !== initialValue && (
              <input
                className="pf-c-radio__input"
                type="radio"
                id={id}
                name={label}
                required
                aria-label={label}
              />
            )}
            <span className="pf-c-radio__label pf-u-w-100">
              {remoteValue !== initialValue && (
                <>
                  <label htmlFor={id}>Use the following value</label>
                  <br />
                </>
              )}
              <TextInput
                type="text"
                id={id}
                name={id}
                defaultValue={userValue}
                onChange={
                  (updatedValue: string) => onChange(label, updatedValue)
                }
              />
            </span>
          </div>
        </StackItem>
      </Stack>
    </AttributeDecisionFormGroup>
  );
};

export default PrimitiveAttributesItemEdit;
