import React from "react";
import {StackItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Primitive} from "app/view/cluster/types";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
} from "app/view/cluster/share";

import {PrimitiveAttrsForm} from "./PrimitiveAttrsForm";

const {attributes} = testMarks.cluster.resources.currentPrimitive;

export const PrimitiveAttrsView = ({primitive}: {primitive: Primitive}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const {filterState, filterParameters} = PcmkAgentAttrsToolbar.useState();
  return (
    <LoadedPcmkAgent agentName={primitive.agentName}>
      {agent => {
        if (isEditing) {
          return (
            <span {...attributes.mark}>
              <StackItem>
                <PcmkAgentAttrsToolbar
                  toolbarName="primitive-attrs"
                  filterState={filterState}
                />
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
                toolbarName="primitive-attrs"
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
