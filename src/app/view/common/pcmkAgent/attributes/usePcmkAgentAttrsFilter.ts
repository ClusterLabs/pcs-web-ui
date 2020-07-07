import React from "react";
import { types } from "app/store";

import { pcmkAgentAttrsFiltersTypes } from "./pcmkAgentAttrsFiltersTypes";

type AgentParameter = types.pcmkAgents.AgentParameter;

export const usePcmkAgentAttrsFilter = (): {
  filters: pcmkAgentAttrsFiltersTypes;
  filterParameters: (p: AgentParameter[]) => AgentParameter[];
} => {
  const [importances, setImportances] = React.useState({
    Required: true,
    Optional: true,
    Advanced: false,
  });
  const [nameSearch, setNameSearch] = React.useState("");
  const filterParameters = React.useCallback(
    (parameters: AgentParameter[]): AgentParameter[] =>
      parameters.filter(
        p =>
          ((!importances.Advanced
            && !importances.Optional
            && !importances.Required)
            || ((!p.advanced || importances.Advanced)
              && (!p.required || importances.Required)
              && (p.required || p.advanced || importances.Optional)))
          && p.name.toLowerCase().startsWith(nameSearch.toLowerCase()),
      ),
    [nameSearch, importances],
  );

  return {
    filters: {
      importances: {
        values: importances,
        set: setImportances,
      },
      nameSearch: {
        value: nameSearch,
        set: setNameSearch,
      },
    },
    filterParameters,
  };
};
