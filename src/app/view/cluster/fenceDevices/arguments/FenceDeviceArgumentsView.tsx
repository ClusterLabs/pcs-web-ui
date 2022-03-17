import { StackItem } from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import {
  ActionTaskLauncher,
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const clusterName = useSelectedClusterName();
  const { filterState, filterParameters } = PcmkAgentAttrsToolbar.useState();
  const fenceDeviceArguments = Object.entries(fenceDevice.arguments).reduce(
    (nameValueMap, [name, { value }]) => ({ ...nameValueMap, [name]: value }),
    {},
  );
  return (
    <LoadedPcmkAgent
      clusterName={clusterName}
      agentName={fenceDevice.agentName}
    >
      {(agent) => {
        return (
          <>
            <StackItem>
              <PcmkAgentAttrsToolbar
                filterState={filterState}
                actions={{
                  "Edit arguments": (
                    <ActionTaskLauncher
                      taskComponent={task.editArgs.EditArgsTask}
                      useTask={task.editArgs.useTask}
                      openArgs={[
                        {
                          fenceDeviceId: fenceDevice.id,
                          fenceDeviceArguments,
                          agentParameters: agent.parameters,
                        },
                      ]}
                      label="Edit arguments"
                      data-test="edit-fence-device-args"
                    />
                  ),
                }}
              />
            </StackItem>
            <StackItem>
              <PcmkAgentAttrsList
                agentAttributes={fenceDevice.arguments}
                resourceAgentParameters={filterParameters(agent.parameters)}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedPcmkAgent>
  );
};
