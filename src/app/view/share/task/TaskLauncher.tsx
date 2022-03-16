import * as React from "react";
import { Button } from "@patternfly/react-core";

type ParamlessOpen = () => void;
export type TaskLauncherProps<ARGS extends unknown[]> = {
  taskComponent: React.FunctionComponent;
} & (
  | {
      label: React.ReactNode;
      ["data-test"]: string;
      variant?: React.ComponentProps<typeof Button>["variant"];
    }
  | { launcher: (_onClick: ParamlessOpen) => React.ReactNode }
) &
  (
    | { useTask: () => { open: ParamlessOpen; isOpened: boolean } }
    | {
        useTask: () => { open: (..._args: ARGS) => void; isOpened: boolean };
        openArgs?: ARGS;
      }
  );

export const TaskLauncher = <ARGS extends unknown[]>(
  props: TaskLauncherProps<ARGS>,
) => {
  const { useTask, taskComponent: TaskComponent } = props;
  const { open, isOpened } = useTask();

  const openTask =
    "openArgs" in props
      ? () => open(...(props.openArgs as ARGS))
      : (open as ParamlessOpen);

  let launcher;
  if ("launcher" in props && props.launcher !== undefined) {
    launcher = props.launcher(openTask);
  } else if ("label" in props) {
    // label is always in props now but typescript does not know :(
    launcher = (
      <Button
        variant={props?.variant ?? "primary"}
        onClick={openTask}
        data-test={props["data-test"]}
      >
        {props.label}
      </Button>
    );
  }

  return (
    <>
      {launcher}
      {isOpened && <TaskComponent />}
    </>
  );
};
