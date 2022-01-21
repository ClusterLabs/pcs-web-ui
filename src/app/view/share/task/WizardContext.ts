import React from "react";

const WizardContext = React.createContext<{
  task: string;
  close: () => void;
}>({
  task: "",
  close: () => {
    console.log("Close wizard");
  },
});

export const WizardContextProvider = WizardContext.Provider;
export const useWizardContext = () => React.useContext(WizardContext);
