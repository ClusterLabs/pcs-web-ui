import * as React from "react";
import { Button } from "@patternfly/react-core";

import { Action } from "app/store";

type Task<ARGS extends unknown[]> = {
  component: React.FunctionComponent;
} & (
  | { useTask: () => { open: () => void; isOpened: boolean } }
  | {
      useTask: () => { open: (..._args: ARGS) => void; isOpened: boolean };
      openArgs?: ARGS;
    }
);

type Confirm = {
  title: string;
  description: React.ReactNode;
  action: Action;
};

type ItemTask<ARGS extends unknown[]> = {
  task: Task<ARGS>;
};

type ItemConfirm = {
  confirm: Confirm;
};

type ItemRun = {
  run: () => void;
};

export type LauncherItem<ARGS extends unknown[] = []> = {
  name: string;
  label?: string;
  disabled?: boolean;
  button?: {
    variant: React.ComponentProps<typeof Button>["variant"];
  };
} & (ItemRun | ItemConfirm | ItemTask<ARGS>);

// export type TaskOpenParams<USE_TASK> = USE_TASK extends () => {
//   open: (..._args: infer ARGS) => void;
// }
//   ? ARGS
//   : never;
