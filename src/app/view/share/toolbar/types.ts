import * as React from "react";
import { Button } from "@patternfly/react-core";

import { Action } from "app/store";

type Task = {
  component: React.FunctionComponent;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  useTask: () => { open: (..._args: any[]) => void; isOpened: boolean };
  openArgs?: unknown[];
};

type Confirm = {
  title: string;
  description: React.ReactNode;
  action: Action;
};

type ItemTask = {
  task: Task;
};

type ItemConfirm = {
  confirm: Confirm;
};

type ItemRun = {
  run: () => void;
};

export type LauncherItem = {
  name: string;
  label?: string;
  disabled?: boolean;
  button?: {
    variant: React.ComponentProps<typeof Button>["variant"];
  };
} & (ItemRun | ItemConfirm | ItemTask);

// export type TaskOpenParams<USE_TASK> = USE_TASK extends () => {
//   open: (..._args: infer ARGS) => void;
// }
//   ? ARGS
//   : never;
