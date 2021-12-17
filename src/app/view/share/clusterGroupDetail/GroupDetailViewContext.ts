import React from "react";

const GroupDetailViewContext = React.createContext<{
  selectedItemUrlName: string;
  urlPrefix: string;
  compact: boolean;
  closeDetailUrl: () => void;
}>({
  selectedItemUrlName: "",
  urlPrefix: "",
  compact: false,
  closeDetailUrl: () => {
    console.log("Close detail");
  },
});

export const GroupDetailViewContextProvider = GroupDetailViewContext.Provider;
export const useGroupDetailViewContext = () =>
  React.useContext(GroupDetailViewContext);
