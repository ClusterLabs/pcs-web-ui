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
  "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET": {
    type: "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET";
    key: { clusterName: string };
  };
  "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET": {
    type: "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
    };
  };
};
