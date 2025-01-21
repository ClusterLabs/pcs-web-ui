import React from "react";

import type {NVPair} from "app/view/cluster/types";

const NVPairListItemContext = React.createContext<NVPair>({
  id: "",
  name: "",
  value: "",
});

export const NVPairListItemContextProvider = NVPairListItemContext.Provider;
export const useNVPairListItemContext = () =>
  React.useContext(NVPairListItemContext);
