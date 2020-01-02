import React from "react";
import {
  ActionGroup,
  Button,
  Form,
  StackItem,
} from "@patternfly/react-core";

import { types } from "app/store";

import PrimitiveAttributesItemEdit from "./PrimitiveAttributesItemEdit";

const PrimitiveAttributesEdit = ({
  primitive,
  resourceAgentParameters,
  close,
}: {
  primitive: types.cluster.Primitive;
  resourceAgentParameters: types.resourceAgents.ResourceAgentParameter[];
  close: () => void;
}) => {
  const [initialParameters] = React.useState(
    resourceAgentParameters.reduce(
      (a, p) => ({
        ...a,
        [p.name]: p.name in primitive.instanceAttributes
          ? primitive.instanceAttributes[p.name]
          : ""
        ,
      }),
      {} as Record<string, any>,
    ),
  );
  const [userParameters, setUserParameters] = React.useState(initialParameters);

  const updateParam = React.useCallback(
    (key: keyof typeof userParameters, value: string) => setUserParameters({
      ...userParameters, [key]: value,
    }),
    [userParameters],
  );

  return (
    <StackItem>
      <Form isHorizontal>
        {resourceAgentParameters.map(parameter => (
          <PrimitiveAttributesItemEdit
            key={parameter.name}
            label={parameter.name}
            value={userParameters[parameter.name].value}
            onChange={updateParam}
          />
        ))}
        <ActionGroup>
          <Button variant="secondary" onClick={close}>Cancel</Button>
        </ActionGroup>
      </Form>
    </StackItem>
  );
};

export default PrimitiveAttributesEdit;
