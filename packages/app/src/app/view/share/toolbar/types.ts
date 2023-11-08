import * as React from "react";
import {Button} from "@patternfly/react-core";

import {Action} from "app/store";

type Task = {
  component: React.FunctionComponent;
  useTask: () => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    open: (..._args: any[]) => void;
    isOpened: boolean;
    close: () => void;
  };
  openArgs?: unknown[];
};

type ItemTask = {
  task: Task;
};

type ItemConfirm = {
  confirm: {
    title: string;
    description: React.ReactNode;
    label?: string;
  } & ({action: Action} | {run: () => void});
};

type ItemRun = {
  run: () => void;
};

export type LauncherItem = {
  name: string;
  "data-test"?: string;
  label?: string;
  disabled?: boolean;
  launchDisable?: {
    isDisabled: boolean;
    title?: string;
    message: React.ReactNode;
  };
  button?: {
    variant: React.ComponentProps<typeof Button>["variant"];
  };
} & (ItemRun | ItemConfirm | ItemTask);

// export type TaskOpenParams<USE_TASK> = USE_TASK extends () => {
//   open: (..._args: infer ARGS) => void;
// }
//   ? ARGS
//   : never;
