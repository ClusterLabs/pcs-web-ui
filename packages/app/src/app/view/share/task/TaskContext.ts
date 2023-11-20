import React from "react";

const TaskContext = React.createContext<{
  task: string;
  taskLabel: string;
  close: () => void;
}>({
  task: "",
  taskLabel: "",
  close: () => {
    console.log("Close wizard");
  },
});

export const TaskContextProvider = TaskContext.Provider;
export const useTaskContext = () => React.useContext(TaskContext);
