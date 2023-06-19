import React from "react";

const TaskContext = React.createContext<{
  clusterName: string | null;
  task: string;
  taskLabel: string;
  close: () => void;
}>({
  task: "",
  taskLabel: "",
  clusterName: null,
  close: () => {
    console.log("Close wizard");
  },
});

export const TaskContextProvider = TaskContext.Provider;
export const useTaskContext = () => React.useContext(TaskContext);
