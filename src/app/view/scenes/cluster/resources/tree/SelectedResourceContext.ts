import React from "react";

const SelectedResourceContext = React.createContext("");

export const SelectedResourceProvider = SelectedResourceContext.Provider;
export const useSelectedResource = (
  () => React.useContext(SelectedResourceContext)
);
