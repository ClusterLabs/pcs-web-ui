import {StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";
import {TaskOpenArgs} from "app/view/share";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
} from "app/view/cluster/share";

import * as task from "./task";

type EditArgsOpenArgs = TaskOpenArgs<typeof task.editArgs.useTask>;

const {argumentsToolbar} = testMarks.cluster.fenceDevices.currentFenceDevice;

export const FenceDeviceArgumentsView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
  const fenceDeviceArguments = Object.entries(fenceDevice.arguments).reduce(
    (nameValueMap, [name, {value}]) => ({...nameValueMap, [name]: value}),
    {},
  );

  return (
    <LoadedPcmkAgent agentName={fenceDevice.agentName}>
      {agent => {
        const editArgsOpenArgs: EditArgsOpenArgs = [
          {
            fenceDeviceId: fenceDevice.id,
            fenceDeviceArguments,
            agentParameters: agent.parameters,
          },
        ];
        return (
          <>
            <StackItem {...argumentsToolbar.mark}>
              <PcmkAgentAttrsToolbar
                filterState={filterState}
                buttonsItems={[
                  {
                    name: "edit-arguments",
                    task: {
                      component: task.editArgs.EditArgsTask,
                      useTask: task.editArgs.useTask,
                      openArgs: editArgsOpenArgs,
                    },
                    button: {variant: "primary"},
                    ...argumentsToolbar.edit.mark,
                  },
                ]}
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
