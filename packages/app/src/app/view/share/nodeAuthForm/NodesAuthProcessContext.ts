import React from "react";

const NodesAuthProcesContext = React.createContext<{
  processId: number;
}>({
  processId: -1,
});

export const NodesAuthProcesProvider = NodesAuthProcesContext.Provider;
export const useNodesAuthProcesContext = () =>
  React.useContext(NodesAuthProcesContext);
