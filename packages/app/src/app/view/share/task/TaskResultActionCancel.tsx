import {TaskResultAction} from "./TaskResultAction";

export const TaskResultActionCancel = (props: {
  "data-test"?: string;
  variant?: "secondary" | "link";
}) => {
  return (
    <TaskResultAction
      variant={props.variant ?? "secondary"}
      label="Cancel"
      data-test={props["data-test"]}
    />
  );
};
