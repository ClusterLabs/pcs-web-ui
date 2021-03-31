export type OrderSetCreateActions = {
  "CONSTRAINT.ORDER.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      id?: string;
      kind?: "Optional" | "Mandatory" | "Serialize";
      symmetrical?: boolean;
    };
  };
};
