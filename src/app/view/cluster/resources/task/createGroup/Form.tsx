import React from "react";
import { DualListSelector, Form as PfForm } from "@patternfly/react-core";

import { FormText, TaskLibReports } from "app/view/share";

import { useTask } from "./useTask";

export const Form: React.FC = () => {
  const {
    updateState,
    availableResources,
    state: { groupId, showValidationErrors, resourceIdList, reports },
  } = useTask();
  const groupNameValidated =
    showValidationErrors && groupId.length === 0 ? "error" : "default";

  const onListChange = (
    _newAvailableOptions: React.ReactNode[],
    newChosenOptions: React.ReactNode[],
  ) =>
    updateState({
      resourceIdList: newChosenOptions.reduce<string[]>(
        (resourceIdList, resource): string[] =>
          resource ? [...resourceIdList, resource.toString()] : resourceIdList,
        [],
      ),
    });
  return (
    <>
      <PfForm data-test="create-group">
        <FormText
          id="new-group-name"
          label="Group name"
          onChange={value => updateState({ groupId: value })}
          value={groupId}
          helperTextInvalid="Please provide a group name"
          isRequired
          validated={groupNameValidated}
          data-test="group-name"
        />
      </PfForm>
      <DualListSelector
        isSearchable
        availableOptions={availableResources}
        availableOptionsTitle="Available resources"
        chosenOptions={resourceIdList}
        chosenOptionsTitle="Choosen resources"
        onListChange={onListChange}
        id="basicSelectorWithSearch"
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
