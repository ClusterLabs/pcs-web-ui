import React from "react";
import {Modal} from "@patternfly/react-core";

import type {selectors} from "app/store";

import {TaskContextProvider} from "./TaskContext";
import {TaskProgress} from "./TaskProgress";

type TaskContextProps = React.ComponentProps<typeof TaskContextProvider>;
type ModalProps = React.ComponentProps<typeof Modal>;

export const TaskSimpleOldApi = (props: {
  close: TaskContextProps["value"]["close"];
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: TaskContextProps["value"]["taskLabel"];

  footer: React.ReactNode;
  configure: React.ReactNode;

  response: "" | "sending" | "ok" | "fail";
  waitTitle: React.ReactNode;
  success: React.ReactNode;
  fail: React.ReactNode;

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
            {props.response !== "" ? null : props.footer}
          </React.Fragment>,
        ]}
        data-test={props["data-test"]}
      >
        {props.response === "" && props.configure}
        {props.response === "sending" && (
          <TaskProgress title={props.waitTitle} />
        )}
        {props.response === "ok" && props.success}
        {props.response === "fail" && props.fail}
      </Modal>
    </TaskContextProvider>
  );
};
