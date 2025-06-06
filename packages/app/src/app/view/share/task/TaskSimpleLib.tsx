import React from "react";
import {Modal} from "app/view/share/Modal";

import type {selectors} from "app/store";

import {TaskResultLib} from "./TaskResultLib";
import {TaskContextProvider} from "./TaskContext";

type TaskResultProps = React.ComponentProps<typeof TaskResultLib>;
type TaskContextProps = React.ComponentProps<typeof TaskContextProvider>;
type ModalProps = React.ComponentProps<typeof Modal>;

export const TaskSimpleLib = (props: {
  close: TaskContextProps["value"]["close"];
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: TaskContextProps["value"]["taskLabel"];

  footer: React.ReactNode;
  configure: React.ReactNode;

  response: TaskResultProps["response"];
  success: TaskResultProps["success"];
  unsuccess: TaskResultProps["unsuccess"];
  communicationError: TaskResultProps["communicationError"];
  reports: TaskResultProps["reports"];

  title?: ModalProps["title"];
  "data-test"?: string;
}) => {
  return (
    <TaskContextProvider
      value={{
        task: props.task,
        close: props.close,
        taskLabel: props.taskLabel,
      }}
    >
      <Modal
        variant="medium"
        title={props.title ?? props.taskLabel}
        isOpen
        onClose={props.close}
        actions={[
          <React.Fragment key="footer">
            {props.response !== "no-response" ? null : props.footer}
          </React.Fragment>,
        ]}
        data-test={props["data-test"]}
      >
        {props.response === "no-response" && props.configure}
        {props.response !== "no-response" && (
          <TaskResultLib
            response={props.response}
            success={props.success}
            unsuccess={props.unsuccess}
            communicationError={props.communicationError}
            reports={props.reports}
          />
        )}
      </Modal>
    </TaskContextProvider>
  );
};
