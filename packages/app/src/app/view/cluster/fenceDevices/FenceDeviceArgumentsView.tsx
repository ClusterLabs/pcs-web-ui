import {StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {FenceDevice} from "app/view/cluster/types";
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
import {useOpenTask} from "app/view/task";

const {
  argumentsToolbar,
  arguments: {pair},
} = testMarks.cluster.fenceDevices.currentFenceDevice;

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
  const fenceDeviceArguments = Object.entries(fenceDevice.arguments).reduce(
    (nameValueMap, [name, {value}]) => ({...nameValueMap, [name]: value}),
    {},
  );

  const hasCibSecrets = Object.values(fenceDevice.arguments).some(arg =>
    isCibSecret(arg.value),
  );

  const secretsToggle = hasCibSecrets ? (
    <CibSecretsToggle
      resourceId={fenceDevice.id}
      attributeNames={Object.entries(fenceDevice.arguments)
        .filter(([, arg]) => isCibSecret(arg.value))
        .map(([name]) => name)}
      {...argumentsToolbar.secretsToggle.mark}
    />
  ) : undefined;

  return (
    <LoadedPcmkAgent
      clusterName={clusterName}
      agentName={fenceDevice.agentName}
    >
      {agent => {
        return (
          <>
            <StackItem {...argumentsToolbar.mark}>
              <PcmkAgentAttrsToolbar
                filterState={filterState}
                buttonsItems={[
                  {
                    name: "edit-arguments",
                    run: () =>
                      openTask("fenceDeviceArgsEdit", {
                        type: "FENCE_DEVICE.EDIT_ARGS.OPEN",
                        key: {clusterName},
                        payload: {
                          clusterName,
                          fenceDeviceId: fenceDevice.id,
                          fenceDeviceArguments,
                          agentParameters: agent.parameters,
                        },
                      }),
                    button: {variant: "primary"},
                    ...argumentsToolbar.edit.mark,
                  },
                ]}
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
                      fenceDevice.arguments[parameter.name]?.value,
                    ) ? (
                      <AttributeValueSecret
                        resourceId={fenceDevice.id}
                        parameterName={parameter.name}
                        revealed={content => (
                          <span {...pair.secretRevealed.mark}>{content}</span>
                        )}
                        hidden={content => (
                          <span {...pair.secret.mark}>{content}</span>
                        )}
                      />
                    ) : (
                      <AttributeValue
                        value={fenceDevice.arguments[parameter.name]?.value}
                        defaultValue={parameter.default}
                        {...pair.value.mark}
                      />
                    )}
                  </AttributeGroup>
                )}
              </AttributeList>
            </StackItem>
          </>
        );
      }}
    </LoadedPcmkAgent>
  );
};
