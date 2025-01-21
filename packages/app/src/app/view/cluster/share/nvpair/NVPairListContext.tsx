import React from "react";

import type {ActionPayload} from "app/store";
import type {NVPair} from "app/view/cluster/types";

const NVPairListContext = React.createContext<{
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.SAVE"]["owner"];
}>({
  nvPairList: [],
  owner: {
    type: "node-utilization",
    id: "",
  },
});

export const NVPairListContextProvider = NVPairListContext.Provider;
export const useNVPairListContext = () => React.useContext(NVPairListContext);
