import {TaskButtonResult} from "./TaskButtonResult";

export const TaskButtonResultTryAgain = (props: {action: () => void}) => {
  return (
    <TaskButtonResult
      variant="secondary"
      label="Try again"
      action={props.action}
    />
  );
};
