import type * as React from "react";
import type {Button, Modal} from "@patternfly/react-core";

import type {Action} from "app/store";

type Task = {
  component: React.FunctionComponent;
  useTask: () => {
    // biome-ignore lint/suspicious/noExplicitAny:
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
    titleVariant?: React.ComponentProps<typeof Modal>["titleIconVariant"];
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
