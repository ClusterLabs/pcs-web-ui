import React from "react";
import {StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {Primitive} from "app/view/cluster/types";
import {
  AttributeValueSecret,
  CibSecretsToggle,
  PcmkAgentAttrName,
  PcmkAgentAttrsToolbar,
  isCibSecret,
  useLoadedCluster,
} from "app/view/cluster/share";
import {
  AttributeGroup,
  AttributeList,
  AttributeValue,
} from "app/view/share/attributes";
import {LoadedPcmkAgent} from "app/view/share";

import {PrimitiveAttrsForm} from "./PrimitiveAttrsForm";

const {attributes} = testMarks.cluster.resources.currentPrimitive;
const {pair} = attributes;

export const PrimitiveAttrsView = ({primitive}: {primitive: Primitive}) => {
  const {clusterName} = useLoadedCluster();
  const [isEditing, setIsEditing] = React.useState(false);
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();

  const hasCibSecrets = Object.values(primitive.instanceAttributes).some(attr =>
    isCibSecret(attr.value),
  );

  const secretsToggle = hasCibSecrets ? (
    <CibSecretsToggle
      resourceId={primitive.id}
      attributeNames={Object.entries(primitive.instanceAttributes)
        .filter(([, attr]) => isCibSecret(attr.value))
        .map(([name]) => name)}
      {...attributes.secretsToggle.mark}
    />
  ) : undefined;

  return (
    <LoadedPcmkAgent clusterName={clusterName} agentName={primitive.agentName}>
      {agent => {
        if (isEditing) {
          return (
            <span {...attributes.mark}>
              <StackItem>
                <PcmkAgentAttrsToolbar filterState={filterState} />
              </StackItem>
              <StackItem>
                <PrimitiveAttrsForm
                  primitive={primitive}
                  resourceAgentParams={agent.parameters}
                  displayNames={filterParameters(agent.parameters).map(
                    p => p.name,
                  )}
                  close={() => setIsEditing(false)}
                />
              </StackItem>
            </span>
          );
        }

        return (
          <span {...attributes.mark}>
            <StackItem>
              <PcmkAgentAttrsToolbar
                buttonsItems={[
                  {
                    name: "edit-attributes",
                    run: () => setIsEditing(true),
                  },
                ]}
                filterState={filterState}
                additionalItems={secretsToggle}
              />
            </StackItem>
            <StackItem>
              <AttributeList attributes={filterParameters(agent.parameters)}>
                {parameter => (
                  <AttributeGroup key={parameter.name} {...pair.mark}>
                    <PcmkAgentAttrName
                      parameter={parameter}
                      {...pair.name.mark}
                    />
                    {isCibSecret(
                      primitive.instanceAttributes[parameter.name]?.value,
                    ) ? (
                      <AttributeValueSecret
                        resourceId={primitive.id}
                        parameterName={parameter.name}
                        revealed={value => (
                          <span {...pair.secretRevealed.mark}>{value}</span>
                        )}
                        hidden={value => (
                          <span {...pair.secret.mark}>{value}</span>
                        )}
                      />
                    ) : (
                      <AttributeValue
                        value={
                          primitive.instanceAttributes[parameter.name]?.value
                        }
                        defaultValue={parameter.default}
                        {...pair.value.mark}
                      />
                    )}
                  </AttributeGroup>
                )}
              </AttributeList>
            </StackItem>
          </span>
        );
      }}
    </LoadedPcmkAgent>
  );
};
