import {StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {FenceDevice} from "app/view/cluster/types";
import {PcmkAgentAttrsToolbar, useLoadedCluster} from "app/view/cluster/share";
import {
  AttributeGroup,
  AttributeHelpPopover,
  AttributeList,
  AttributeName,
  AttributeValue,
} from "app/view/share/attributes";
import {LoadedPcmkAgent} from "app/view/share";
import {useOpenTask} from "app/view/task";

const {argumentsToolbar} = testMarks.cluster.fenceDevices.currentFenceDevice;

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
              />
            </StackItem>
            <StackItem>
              <AttributeList attributes={filterParameters(agent.parameters)}>
                {parameter => (
                  <AttributeGroup key={parameter.name}>
                    <AttributeName name={parameter.name}>
                      <AttributeHelpPopover
                        header={parameter.shortdesc}
                        body={parameter.longdesc}
                        defaultValue={parameter.default}
                      />
                    </AttributeName>
                    <AttributeValue
                      value={fenceDevice.arguments[parameter.name]?.value}
                      defaultValue={parameter.default}
                    />
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
