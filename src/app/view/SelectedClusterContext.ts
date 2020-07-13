import React from "react";

const SelectedClusterContext = React.createContext("");

export const SelectedClusterProvider = SelectedClusterContext.Provider;
export const useSelectedClusterName = () =>
  React.useContext(SelectedClusterContext);
