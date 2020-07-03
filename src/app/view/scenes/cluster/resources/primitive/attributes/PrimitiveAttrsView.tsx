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
  return (
    <LoadedPcmkAgent agentName={primitive.agentName}>
      {(agent: types.pcmkAgents.Agent) => {
        if (isEditing) {
          return (
            <StackItem>
              <PrimitiveAttrsForm
                primitive={primitive}
                resourceAgentParams={agent.parameters}
                close={() => setIsEditing(false)}
              />
            </StackItem>
          );
        }

        return (
          <>
            <StackItem>
              <PrimitiveAttrsToolbar
                edit={() => setIsEditing(true)}
                attributeNameSearch={attributeNameSearch}
                setAttributeNameSearch={setAttributeNameSearch}
                importances={importances}
                setImportances={setImportances}
              />
            </StackItem>
            <StackItem>
              <PcmkAgentAttrsList
                agentAttributes={primitive.instanceAttributes}
                resourceAgentParameters={agent.parameters.filter(
                  p =>
                    ((!importances.Advanced
                      && !importances.Optional
                      && !importances.Required)
                      || ((!p.advanced || importances.Advanced)
                        && (!p.required || importances.Required)
                        && (p.required || p.advanced || importances.Optional)))
                    && p.name
                      .toLowerCase()
                      .startsWith(attributeNameSearch.toLowerCase()),
                )}
              />
            </StackItem>
          </>
        );
      }}
    </LoadedPcmkAgent>
  );
};
