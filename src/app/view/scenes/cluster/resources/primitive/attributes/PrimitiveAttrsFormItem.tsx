import React from "react";
import {
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";

import { PrimitiveAttrsFormItemRadio } from "./PrimitiveAttrsFormItemRadio";
import { PrimitiveAttrsFormItemLabel } from "./PrimitiveAttrsFormItemLabel";
import { PrimitiveAttrsFormItemWarning } from "./PrimitiveAttrsFormItemWarning";

export const PrimitiveAttrsFormItem = ({
  id,
  userValue,
  initialValue,
  remoteValue,
  onChange,
  chooseRemoteUse,
  chooseValueUse,
}: {
  id: string;
  userValue: string;
  initialValue: string;
  remoteValue: string;
  onChange: (value: string) => void;
  chooseRemoteUse: () => void;
  chooseValueUse: () => void;
}) => {
  const decideName = `${id}-choice`;
  const decideIdRemote = `${decideName}-remote`;
  const decideIdUser = `${decideName}-user`;
  return (
    <Stack>
      {remoteValue !== initialValue && (
        <>
          <StackItem className="pf-u-mb-sm">
            <PrimitiveAttrsFormItemWarning remoteValue={remoteValue} />
          </StackItem>
          <StackItem className="pf-u-mt-sm">
            <PrimitiveAttrsFormItemRadio
              id={decideIdRemote}
              name={decideName}
              ariaLabel={`Use concurent value: ${remoteValue}`}
              onSelect={chooseRemoteUse}
            >
              <PrimitiveAttrsFormItemLabel
                htmlFor={decideIdRemote}
                remoteValue={remoteValue}
              />
            </PrimitiveAttrsFormItemRadio>
          </StackItem>
        </>
      )}
      <StackItem className="pf-u-mt-sm">
        <PrimitiveAttrsFormItemRadio
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
        </PrimitiveAttrsFormItemRadio>
      </StackItem>
    </Stack>
  );
};
