import { DualListSelector } from "@patternfly/react-core";

import { TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Roles = () => {
  const {
    updateState,
    availableRoles,
    state: {
      roleList,
      libCall: { reports },
    },
  } = useTask();

  const onListChange = (
    _newAvailableOptions: React.ReactNode[],
    newChosenOptions: React.ReactNode[],
  ) =>
    updateState({
      roleList: newChosenOptions.reduce<string[]>(
        (roleIdList, role): string[] =>
          role ? [...roleIdList, role.toString()] : roleIdList,
        [],
      ),
    });

  return (
    <TaskLibStep title="Asign acl roles" reports={reports}>
      <DualListSelector
        isSearchable
        availableOptions={availableRoles}
        availableOptionsTitle="Available resources"
        chosenOptions={roleList}
        chosenOptionsTitle="Choosen resources"
        onListChange={onListChange}
        id="basicSelectorWithSearch"
      />
    </TaskLibStep>
  );
};
