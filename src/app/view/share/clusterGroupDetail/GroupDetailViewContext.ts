import React from "react";

const GroupDetailViewContext = React.createContext<{
  selectedItemUrlName: string;
  compact: boolean;
  closeDetailUrl: () => void;
}>({
  selectedItemUrlName: "",
  compact: false,
  closeDetailUrl: () => {
    console.log("Close detail");
  },
});

export const GroupDetailViewContextProvider = GroupDetailViewContext.Provider;
export const useGroupDetailViewContext = () =>
  React.useContext(GroupDetailViewContext);
