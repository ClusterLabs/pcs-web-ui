import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  useSelectedClusterName,
} from "app/view";

import { PrimitiveAttrsForm } from "./PrimitiveAttrsForm";

export const PrimitiveAttrsView = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const clusterName = useSelectedClusterName();
  const [isEditing, setIsEditing] = React.useState(false);
  const { filterState, filterParameters } = PcmkAgentAttrsToolbar.useState();
  return (
    <LoadedPcmkAgent
      clusterUrlName={clusterName}
      agentName={primitive.agentName}
    >
      {(agent: types.pcmkAgents.Agent) => {
        if (isEditing) {
          return (
            <>
              <StackItem>
                <PcmkAgentAttrsToolbar filterState={filterState} />
              </StackItem>
              <StackItem>
                <PrimitiveAttrsForm
                  primitive={primitive}
                  resourceAgentParams={filterParameters(agent.parameters)}
                  close={() => setIsEditing(false)}
                />
              </StackItem>
            </>
          );
        }

        return (
          <>
            <StackItem>
              <PcmkAgentAttrsToolbar
                actions={{
                  "Edit Attributes": () => setIsEditing(true),
                }}
                filterState={filterState}
              />
            </StackItem>
            <StackItem>
              <PcmkAgentAttrsList
                agentAttributes={primitive.instanceAttributes}
                resourceAgentParameters={filterParameters(agent.parameters)}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedPcmkAgent>
  );
};
