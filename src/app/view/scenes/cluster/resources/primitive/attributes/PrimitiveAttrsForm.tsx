import React from "react";
import { useDispatch } from "react-redux";
import { Action } from "app/actions";
import {
  ActionGroup,
  Button,
  Form,
} from "@patternfly/react-core";

import { types } from "app/store";
import { useSelectedCluster } from "app/view/scenes/cluster";

import PrimitiveAttrsFormItem from "./PrimitiveAttrsFormItem";
import PrimitiveAttrsFormItemLayout from "./PrimitiveAttrsFormItemLayout";

type FormAttr = {
  value: string;
  initial: string;
  srcChoice: "undecided"|"remote"|"user";
}

const instanceAttr = (primitive: types.cluster.Primitive, name: string) => (
  name in primitive.instanceAttributes
    ? primitive.instanceAttributes[name].value
    : ""
);

const collectUpdatedAttrs = (
  formMap: Record<string, FormAttr>,
  primitive: types.cluster.Primitive,
) => Object.keys(formMap).reduce(
  (a, n) => {
    if (
      (
        instanceAttr(primitive, n) === formMap[n].initial
        &&
        formMap[n].value !== formMap[n].initial
      )
      ||
      formMap[n].srcChoice === "user"
    ) {
      return { ...a, [n]: formMap[n].value };
    }
    return a;
  },
  {} as Record<string, any>,
);

const hasUndecidedSrc = (
  formMap: Record<string, FormAttr>,
  primitive: types.cluster.Primitive,
) => Object.keys(formMap).some(n => (
  instanceAttr(primitive, n) !== formMap[n].initial
  &&
  formMap[n].srcChoice === "undecided"
));

const PrimitiveAttrsForm = ({ primitive, resourceAgentParams, close }: {
  primitive: types.cluster.Primitive;
  resourceAgentParams: types.resourceAgents.ResourceAgentParameter[];
  close: () => void;
}) => {
  const clusterUrlName = useSelectedCluster();

  const dispatch = useDispatch();

  const [formMap, setFormMap] = React.useState<Record<string, FormAttr>>(
    resourceAgentParams.reduce((a, p) => ({
      ...a,
      [p.name]: {
        initial: instanceAttr(primitive, p.name),
        value: instanceAttr(primitive, p.name),
        srcChoice: "undecided",
      },
    }), {}),
  );

  const updateParam = React.useCallback(
    (key: string) => (value: FormAttr["value"]) => setFormMap({
      ...formMap,
      [key]: { ...formMap[key], value },
    }),
    [formMap, setFormMap],
  );

  const chooseSrc = React.useCallback(
    (key: string, srcChoice: FormAttr["srcChoice"]) => () => setFormMap({
      ...formMap,
      [key]: { ...formMap[key], srcChoice },
    }),
    [formMap, setFormMap],
  );

  return (
    <Form isHorizontal>
      {resourceAgentParams.map(parameter => (
        <PrimitiveAttrsFormItemLayout
          resourceAgentParam={parameter}
          key={parameter.name}
        >
          <PrimitiveAttrsFormItem
            id={`resource-instance-attribute-${parameter.name}`}
            userValue={formMap[parameter.name].value}
            initialValue={formMap[parameter.name].initial}
            remoteValue={instanceAttr(primitive, parameter.name)}
            onChange={updateParam(parameter.name)}
            chooseRemoteUse={chooseSrc(parameter.name, "remote")}
            chooseValueUse={chooseSrc(parameter.name, "user")}
          />
        </PrimitiveAttrsFormItemLayout>
      ))}
      <ActionGroup>
        <Button
          variant="primary"
          onClick={() => {
            dispatch<Action>({
              type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES",
              payload: {
                clusterUrlName,
                resourceId: primitive.id,
                attributes: collectUpdatedAttrs(formMap, primitive),
              },
            });
            close();
          }}
          isDisabled={hasUndecidedSrc(formMap, primitive)}
        >
          Save attributes
        </Button>
        <Button variant="secondary" onClick={close}>Cancel</Button>
      </ActionGroup>
    </Form>
  );
};

export default PrimitiveAttrsForm;