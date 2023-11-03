import React from "react";
import {Modal} from "@patternfly/react-core";

import {selectors} from "app/store";

import {TaskContextProvider} from "./TaskContext";

export const TaskSimple = ({
  close,
  task,
  footer,
  children,
  title,
  taskLabel,
  "data-test": dataTest,
}: {
  close: () => void;
  footer: React.ReactNode;
  ["data-test"]?: string;
  children: React.ReactNode;
  taskLabel: string;
  title?: React.ComponentProps<typeof Modal>["title"];
} & (
  | {
      task: Parameters<typeof selectors.getClusterTask>[0];
    }
  | {
      task: Parameters<typeof selectors.getTask>[0];
    }
)) => {
  return (
    <TaskContextProvider value={{task, close, clusterName: null, taskLabel}}>
      <Modal
        variant="medium"
        title={title ?? taskLabel}
        isOpen
        onClose={close}
        actions={[<React.Fragment key="footer">{footer}</React.Fragment>]}
        data-test={dataTest}
      >
        {children}
      </Modal>
    </TaskContextProvider>
  );
};
