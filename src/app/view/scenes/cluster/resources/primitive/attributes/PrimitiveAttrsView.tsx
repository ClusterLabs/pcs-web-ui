import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import {
  LoadedPcmkAgent,
  PcmkAgentAttrsList,
  PcmkAgentAttrsToolbar,
  usePcmkAgentAttrsFilter,
} from "app/view/common";

import { PrimitiveAttrsForm } from "./PrimitiveAttrsForm";

export const PrimitiveAttrsView = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const {
    importances,
    setImportances,
    attributeNameSearch,
    setAttributeNameSearch,
    filterParameters,
  } = usePcmkAgentAttrsFilter();
  return (
    <LoadedPcmkAgent agentName={primitive.agentName}>
      {(agent: types.pcmkAgents.Agent) => {
        if (isEditing) {
          return (
            <>
              <StackItem>
                <PcmkAgentAttrsToolbar
                  attributeNameSearch={attributeNameSearch}
                  setAttributeNameSearch={setAttributeNameSearch}
                  importances={importances}
                  setImportances={setImportances}
                />
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
                attributeNameSearch={attributeNameSearch}
                setAttributeNameSearch={setAttributeNameSearch}
                importances={importances}
                setImportances={setImportances}
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
