import { StackItem } from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  useSelectedClusterName,
} from "app/view/share";

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const clusterName = useSelectedClusterName();
  const { filterState, filterParameters } = PcmkAgentAttrsToolbar.useState();
  return (
    <LoadedPcmkAgent
      clusterName={clusterName}
      agentName={fenceDevice.agentName}
    >
      {(agent) => {
        return (
          <>
            <StackItem>
              <PcmkAgentAttrsToolbar filterState={filterState} />
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
