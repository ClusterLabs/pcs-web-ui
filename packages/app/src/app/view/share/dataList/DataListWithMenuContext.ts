import * as React from "react";

export const DataListWithMenuContext = React.createContext<{listName: string}>({
  listName: "",
});

export const DataListWithMenuContextProvider = DataListWithMenuContext.Provider;
export const useDataListWithMenuContext = () =>
  React.useContext(DataListWithMenuContext);
