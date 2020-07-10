type Importances = {
  Required: boolean;
  Optional: boolean;
  Advanced: boolean;
};
export type pcmkAgentAttrsFiltersTypes = {
  importances: {
    values: Importances;
    set: (i: Importances) => void;
  };
  nameSearch: {
    value: string;
    set: (v: string) => void;
  };
};
