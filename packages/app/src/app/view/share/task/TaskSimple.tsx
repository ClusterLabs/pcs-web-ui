import React from "react";
import {Modal} from "@patternfly/react-core";

import type {selectors} from "app/store";

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
  "data-test"?: string;
  children: React.ReactNode;
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: string;
  title?: React.ComponentProps<typeof Modal>["title"];
}) => {
  return (
    <TaskContextProvider value={{task, close, taskLabel}}>
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
