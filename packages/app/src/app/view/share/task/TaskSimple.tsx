import React from "react";
import {Modal} from "@patternfly/react-core";

import {selectors} from "app/store";

import {TaskContextProvider} from "./TaskContext";

export const TaskSimple = ({
  close,
  task,
  clusterName,
  footer,
  children,
  title,
  "data-test": dataTest,
}: {
  close: () => void;
  footer: React.ReactNode;
  title: React.ComponentProps<typeof Modal>["title"];
  ["data-test"]?: string;
  children: React.ReactNode;
} & (
  | {
      task: Parameters<typeof selectors.getClusterTask>[0];
      clusterName: string;
    }
  | {
      task: Parameters<typeof selectors.getTask>[0];
      clusterName: null;
    }
)) => {
  return (
    <TaskContextProvider value={{task, close, clusterName}}>
      <Modal
        variant="medium"
        title={title}
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
