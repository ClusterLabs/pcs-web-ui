import {StackItem} from "@patternfly/react-core";

import {FenceDevice} from "app/view/cluster/types";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  TaskOpenArgs,
} from "app/view/share";

import * as task from "./task";

type EditArgsOpenArgs = TaskOpenArgs<typeof task.editArgs.useTask>;

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
            <StackItem>
              <PcmkAgentAttrsToolbar
                toolbarName="fence-device-args"
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
