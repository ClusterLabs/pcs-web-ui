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
  const decideName = `rc-instance-attr-choice-${label}`;
  const decideIdRemote = `${decideName}-remote`;
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
                id={decideIdRemote}
                name={decideName}
                ariaLabel={`Use concurent value: ${remoteValue}`}
              >
                <label className="pf-c-radio__label" htmlFor={decideIdRemote}>
                  Use the new value
                </label>
                <br />
                <strong>{remoteValue}</strong>
              </AttributeDecisionRadio>
            </StackItem>
          </>
        )}
        <StackItem className="pf-u-mt-sm">
          <AttributeDecisionRadio
            id={`${decideName}-user`}
            name={decideName}
            ariaLabel={`Use a user value: ${userValue}`}
            active={remoteValue !== initialValue}
          >
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
          </AttributeDecisionRadio>
        </StackItem>
      </Stack>
    </AttributeDecisionFormGroup>
  );
};

export default PrimitiveAttributesItemEdit;
