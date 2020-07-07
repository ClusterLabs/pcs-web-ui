import React from "react";
import { types } from "app/store";

export const usePcmkAgentAttrsFilter = () => {
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

  return {
    importances,
    setImportances,
    attributeNameSearch,
    setAttributeNameSearch,
    filterParameters,
  };
};
