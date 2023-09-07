import {TaskButtonResult} from "./TaskButtonResult";

export const TaskButtonSimpleResultBack = (props: {
  action: () => void;
  "data-test"?: string;
}) => {
  return (
    <TaskButtonResult
      label="Back"
      action={props.action}
      data-test={props["data-test"]}
    />
  );
};
