import React from "react";

const TaskContext = React.createContext<{
  task: string;
  close: () => void;
}>({
  task: "",
  close: () => {
    console.log("Close wizard");
  },
});

export const TaskContextProvider = TaskContext.Provider;
export const useTaskContext = () => React.useContext(TaskContext);
