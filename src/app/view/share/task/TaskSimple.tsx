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
  "data-test": dataTest,
}: {
  task:
    | Parameters<typeof selectors.getClusterTask>[0]
    | Parameters<typeof selectors.getTask>[0];
  close: () => void;
  footer: React.ReactNode;
  title: React.ComponentProps<typeof Modal>["title"];
  ["data-test"]?: string;
  children: React.ReactNode;
}) => {
  return (
    <TaskContextProvider value={{task, close}}>
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
