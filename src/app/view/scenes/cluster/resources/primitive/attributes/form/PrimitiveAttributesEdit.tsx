import React from "react";
import { useDispatch } from "react-redux";
import { Action } from "app/actions";
import {
  ActionGroup,
  Button,
  Form,
  StackItem,
} from "@patternfly/react-core";

import { types } from "app/store";
import { useSelectedCluster } from "app/view/scenes/cluster";

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
  const dispatch = useDispatch();
  const [initialParameters] = React.useState(
    resourceAgentParameters.reduce(
      (a, p) => ({
        ...a,
        [p.name]: p.name in primitive.instanceAttributes
          ? primitive.instanceAttributes[p.name].value
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

  const clusterUrlName = useSelectedCluster();

  return (
    <StackItem>
      <Form isHorizontal>
        {resourceAgentParameters.map(parameter => (
          <PrimitiveAttributesItemEdit
            key={parameter.name}
            label={parameter.name}
            value={userParameters[parameter.name]}
            onChange={updateParam}
          />
        ))}
        <ActionGroup>
          <Button
            variant="primary"
            onClick={() => {
              dispatch<Action>({
                type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES",
                payload: {
                  resourceId: primitive.id,
                  attributes: userParameters,
                  clusterUrlName,
                },
              });
              close();
            }}
          >
            Save attributes
          </Button>
          <Button variant="secondary" onClick={close}>Cancel</Button>
        </ActionGroup>
      </Form>
    </StackItem>
  );
};

export default PrimitiveAttributesEdit;
