import React from "react";
import {StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {Primitive} from "app/view/cluster/types";
import {
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";
import {LoadedPcmkAgent} from "app/view/share";

import {PrimitiveAttrsForm} from "./PrimitiveAttrsForm";

const {attributes} = testMarks.cluster.resources.currentPrimitive;

export const PrimitiveAttrsView = ({primitive}: {primitive: Primitive}) => {
  const {clusterName} = useLoadedCluster();
  const [isEditing, setIsEditing] = React.useState(false);
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
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
              />
            </StackItem>
            <StackItem>
              <PcmkAgentAttrsList
                agentAttributes={primitive.instanceAttributes}
                resourceAgentParameters={filterParameters(agent.parameters)}
              />
            </StackItem>
          </span>
        );
      }}
    </LoadedPcmkAgent>
  );
};
