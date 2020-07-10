import React from "react";

const GroupDetailViewContext = React.createContext({
  selectedItemUrlName: "",
  urlPrefix: "",
  compact: false,
});

export const GroupDetailViewContextProvider = GroupDetailViewContext.Provider;
export const useGroupDetailViewContext = () =>
  React.useContext(GroupDetailViewContext);
