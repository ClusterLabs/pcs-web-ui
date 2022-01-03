import { StackItem } from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  useSelectedClusterName,
} from "app/view/share";

import { EditArgsTask, useTask } from "./task/editArgs";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const clusterName = useSelectedClusterName();
  const { filterState, filterParameters } = PcmkAgentAttrsToolbar.useState();
  const { open: openEdit, isOpened: isOpenEdit } = useTask();
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
                  "Edit arguments": () =>
                    openEdit({
                      fenceDeviceId: fenceDevice.id,
                      fenceDeviceArguments: fenceDevice.arguments,
                      agentParameters: agent.parameters,
                    }),
                }}
              />
              {isOpenEdit && <EditArgsTask />}
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
