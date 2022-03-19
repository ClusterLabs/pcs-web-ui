import { ActionListItem } from "@patternfly/react-core";

import { TaskLauncher, TaskLauncherProps } from "./TaskLauncher";

export const ActionTaskLauncher = <ARGS extends unknown[]>(
  props: TaskLauncherProps<ARGS>,
) => {
  return (
    <ActionListItem>
      <TaskLauncher {...props} />
    </ActionListItem>
  );
};
