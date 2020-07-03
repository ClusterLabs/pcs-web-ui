import React from "react";
import { StackItem } from "@patternfly/react-core";

import { types } from "app/store";
import { LoadedPcmkAgent, PcmkAgentAttrsList } from "app/view/common";

import { PrimitiveAttrsForm } from "./PrimitiveAttrsForm";
import { PrimitiveAttrsToolbar } from "./PrimitiveAttrsToolbar";

export const PrimitiveAttrsView = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [importances, setImportances] = React.useState({
    Required: true,
    Optional: true,
    Advanced: false,
  });
  const [attributeNameSearch, setAttributeNameSearch] = React.useState("");
  const filterParameters = React.useCallback(
    (parameters: types.pcmkAgents.AgentParameter[]) =>
      parameters.filter(
        p =>
          ((!importances.Advanced
            && !importances.Optional
            && !importances.Required)
            || ((!p.advanced || importances.Advanced)
              && (!p.required || importances.Required)
              && (p.required || p.advanced || importances.Optional)))
          && p.name.toLowerCase().startsWith(attributeNameSearch.toLowerCase()),
      ),
    [attributeNameSearch, importances],
  );
  return (
    <LoadedPcmkAgent agentName={primitive.agentName}>
      {(agent: types.pcmkAgents.Agent) => {
        if (isEditing) {
          return (
            <>
              <StackItem>
                <PrimitiveAttrsToolbar
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
              <PrimitiveAttrsToolbar
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
