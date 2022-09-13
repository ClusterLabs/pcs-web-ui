import * as React from "react";

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

export type LauncherItem<ARGS extends unknown[] = []> = {
  name: string;
  label?: string;
  disabled?: boolean;
} & (ItemConfirm | ItemTask<ARGS>);

// export type TaskOpenParams<USE_TASK> = USE_TASK extends () => {
//   open: (..._args: infer ARGS) => void;
// }
//   ? ARGS
//   : never;
