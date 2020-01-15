import React from "react";
import {
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";

import AttributeDecisionFormGroup from "./AttributeDecisionFormGroup";
import AttributeDecisionRadio from "./AttributeDecisionRadio";
import AttributeDecisionLabelRemote from "./AttributeDecisionLabelRemote";
import AttributeConflictWarning from "./AttributeConflictWarning";

const PrimitiveAttributesItemEdit = ({
  label,
  userValue,
  initialValue,
  remoteValue,
  onChange,
  chooseRemoteUse,
  chooseValueUse,
}: {
  label: string;
  userValue: string;
  initialValue: string;
  remoteValue: string;
  onChange: (value: string) => void;
  chooseRemoteUse: () => void;
  chooseValueUse: () => void;
}) => {
  const id = `resource-attribute-${label}`;
  const decideName = `rc-instance-attr-choice-${label}`;
  const decideIdRemote = `${decideName}-remote`;
  const decideIdUser = `${decideName}-user`;
  return (
    <AttributeDecisionFormGroup label={label}>
      <Stack>
        {remoteValue !== initialValue && (
          <>
            <StackItem className="pf-u-mb-sm">
              <AttributeConflictWarning remoteValue={remoteValue} />
            </StackItem>
            <StackItem className="pf-u-mt-sm">
              <AttributeDecisionRadio
                id={decideIdRemote}
                name={decideName}
                ariaLabel={`Use concurent value: ${remoteValue}`}
                onSelect={chooseRemoteUse}
              >
                <AttributeDecisionLabelRemote
                  htmlFor={decideIdRemote}
                  remoteValue={remoteValue}
                />
              </AttributeDecisionRadio>
            </StackItem>
          </>
        )}
        <StackItem className="pf-u-mt-sm">
          <AttributeDecisionRadio
            id={decideIdUser}
            name={decideName}
            ariaLabel={`Use a user value: ${userValue}`}
            onSelect={chooseValueUse}
            active={remoteValue !== initialValue}
          >
            <span className="pf-c-radio__label pf-u-w-100">
              {remoteValue !== initialValue && (
                <>
                  <label className="pf-c-radio__label" htmlFor={decideIdUser}>
                    Use the following value
                  </label>
                  <br />
                </>
              )}
              <TextInput
                type="text"
                id={id}
                name={id}
                defaultValue={userValue}
                onChange={onChange}
              />
            </span>
          </AttributeDecisionRadio>
        </StackItem>
      </Stack>
    </AttributeDecisionFormGroup>
  );
};

export default PrimitiveAttributesItemEdit;
