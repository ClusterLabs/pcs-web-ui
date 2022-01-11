import React from "react";
import { Form } from "@patternfly/react-core";

import { FormText } from "app/view/share";

import { useTask } from "./useTask";

export const EditArgsForm: React.FC = () => {
  const {
    state: { agentParameters, fenceDeviceArguments },
    update,
  } = useTask();
  return (
    <Form isHorizontal>
      {agentParameters.map(parameter => (
        <FormText
          key={parameter.name}
          id={`arg-${parameter.name}`}
          label={parameter.name}
          popover={{
            header: parameter.shortdesc,
            body: parameter.longdesc,
            defaultValue: parameter.default,
          }}
          value={fenceDeviceArguments[parameter.name]?.value ?? ""}
          onChange={value => update(parameter.name, value)}
          data-test={`fence-device-arg-${parameter.name}`}
        />
      ))}
    </Form>
  );
};
