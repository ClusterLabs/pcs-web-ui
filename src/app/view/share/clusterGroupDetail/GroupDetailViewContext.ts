import React from "react";

const GroupDetailViewContext = React.createContext<{
  selectedItemUrlType: string | null;
  selectedItemUrlName: string;
  compact: boolean;
  closeDetailUrl: () => void;
}>({
  selectedItemUrlType: null,
  selectedItemUrlName: "",
  compact: false,
  closeDetailUrl: () => {
    console.log("Close detail");
  },
});

export const GroupDetailViewContextProvider = GroupDetailViewContext.Provider;
export const useGroupDetailViewContext = () =>
  React.useContext(GroupDetailViewContext);
