import React from "react";
import {ActionGroup, Alert, Button, Form} from "@patternfly/react-core";

import type {Primitive} from "app/view/cluster/types";
import {useDispatch} from "app/view/share";
import {type pcmkAgentTypes, useLoadedCluster} from "app/view/cluster/share";

import {PrimitiveAttrsFormItem} from "./PrimitiveAttrsFormItem";
import {PrimitiveAttrsFormItemLayout} from "./PrimitiveAttrsFormItemLayout";

type FormAttr = {
  value: string;
  initial: string;
  srcChoice: "undecided" | "remote" | "user";
};

const instanceAttr = (primitive: Primitive, name: string) =>
  name in primitive.instanceAttributes
    ? primitive.instanceAttributes[name].value
    : "";

const collectUpdatedAttrs = (
  formMap: Record<string, FormAttr>,
  primitive: Primitive,
) =>
  Object.keys(formMap).reduce(
    (a, n) => {
      if (
        (instanceAttr(primitive, n) === formMap[n].initial &&
          formMap[n].value !== formMap[n].initial) ||
        formMap[n].srcChoice === "user"
      ) {
        return {...a, [n]: formMap[n].value};
      }
      return a;
    },
    // biome-ignore lint/suspicious/noExplicitAny:
    {} as Record<string, any>,
  );

const hasUndecidedSrc = (
  formMap: Record<string, FormAttr>,
  primitive: Primitive,
) =>
  Object.keys(formMap).some(
    n =>
      instanceAttr(primitive, n) !== formMap[n].initial &&
      formMap[n].srcChoice === "undecided",
  );

const hasBackendChange = (
  formMap: Record<string, FormAttr>,
  primitive: Primitive,
) =>
  Object.keys(formMap).some(
    n => instanceAttr(primitive, n) !== formMap[n].initial,
  );

export const PrimitiveAttrsForm = ({
  primitive,
  resourceAgentParams,
  displayNames,
  close,
}: {
  primitive: Primitive;
  resourceAgentParams: pcmkAgentTypes.AgentParameter[];
  displayNames: string[];
  close: () => void;
}) => {
  const {clusterName} = useLoadedCluster();

  const dispatch = useDispatch();

  const [formMap, setFormMap] = React.useState<Record<string, FormAttr>>(
    resourceAgentParams.reduce(
      (a, p) => ({
        ...a,
        [p.name]: {
          initial: instanceAttr(primitive, p.name),
          value: instanceAttr(primitive, p.name),
          srcChoice: "undecided",
        },
      }),
      {},
    ),
  );

  const updateParam = React.useCallback(
    (key: string) => (value: FormAttr["value"]) =>
      setFormMap({
        ...formMap,
        [key]: {...formMap[key], value},
      }),
    [formMap],
  );

  const chooseSrc = React.useCallback(
    (key: string, srcChoice: FormAttr["srcChoice"]) => () =>
      setFormMap({
        ...formMap,
        [key]: {...formMap[key], srcChoice},
      }),
    [formMap],
  );

  return (
    <Form isHorizontal>
      {hasBackendChange(formMap, primitive) && (
        <Alert
          variant="warning"
          isInline
          title={
            "One or more values in this form were updated by another user after" +
            " you opened the form."
          }
        >
          Values that were updated will require an additional input from you on
          which value to use.
        </Alert>
      )}
      {resourceAgentParams
        .filter(parameter => displayNames.includes(parameter.name))
        .map(parameter => (
          <PrimitiveAttrsFormItemLayout
            name={parameter.name}
            shortdesc={parameter.shortdesc}
            longdesc={parameter.longdesc}
            defaultValue={parameter.default}
            required={
              formMap[parameter.name].initial !==
              instanceAttr(primitive, parameter.name)
            }
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
            dispatch({
              type: "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES",
              key: {clusterName},
              payload: {
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
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};
