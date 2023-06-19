import {TaskResultAction} from "./TaskResultAction";

export const TaskResultActionProceedAnyway = (props: {
  action: () => void;
  "data-test"?: string;
}) => {
  return (
    <TaskResultAction
      variant="secondary"
      label="Proceed anyway with current settings"
      action={props.action}
      data-test={props["data-test"]}
    />
  );
};
