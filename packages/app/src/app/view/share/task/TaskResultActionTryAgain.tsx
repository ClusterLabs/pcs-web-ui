import {TaskResultAction} from "./TaskResultAction";

export const TaskResultActionTryAgain = (props: {action: () => void}) => {
  return (
    <TaskResultAction
      variant="secondary"
      label="Try again"
      action={props.action}
    />
  );
};
