import {TaskButtonResult} from "./TaskButtonResult";

export const TaskButtonResultProceedAnyway = (props: {
  action: () => void;
  "data-test"?: string;
}) => {
  return (
    <TaskButtonResult
      variant="secondary"
      label="Proceed anyway with current settings"
      action={props.action}
      data-test={props["data-test"]}
    />
  );
};
