import {TaskResultAction} from "./TaskResultAction";

export const TaskResultActionCancel = (props: {"data-test"?: string}) => {
  return (
    <TaskResultAction
      variant="secondary"
      label="Cancel"
      data-test={props["data-test"]}
    />
  );
};
