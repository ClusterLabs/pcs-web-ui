import React from "react";

const ResourceTreeContext = React.createContext({
  selectedResourceId: "",
  clusterUrlName: "",
});

export const ResourceTreeContextProvider = ResourceTreeContext.Provider;
export const useResourceTreeContext = (
  () => React.useContext(ResourceTreeContext)
);
