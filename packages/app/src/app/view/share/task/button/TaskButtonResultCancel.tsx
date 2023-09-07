import {TaskButtonResult} from "./TaskButtonResult";

export const TaskButtonResultCancel = (props: {
  "data-test"?: string;
  variant?: "secondary" | "link";
}) => {
  return (
    <TaskButtonResult
      variant={props.variant ?? "secondary"}
      label="Cancel"
      data-test={props["data-test"]}
    />
  );
};
