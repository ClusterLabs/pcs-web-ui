import React from "react";
import {Form as PfForm} from "@patternfly/react-core";

import {DualListSelector, FormText, TaskLibReportList} from "app/view/share";

import {useTask} from "./useTask";

export const Form = () => {
  const {
    updateState,
    availableResources,
    state: {groupId, showValidationErrors, resourceIdList, reports},
  } = useTask();

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
      <PfForm>
        <FormText
          id="new-group-name"
          label="Group name"
          onChange={value => updateState({groupId: value})}
          value={groupId}
          helperTextInvalid="Please provide a group name"
          isRequired
          showValidationErrors={showValidationErrors}
          isValid={groupId.length > 0}
        />
      </PfForm>
      <DualListSelector
        isSearchable
        availableOptions={availableResources}
        availableOptionsTitle="Available resources"
        chosenOptions={resourceIdList}
        chosenOptionsTitle="Chosen resources"
        onListChange={onListChange}
        id="basicSelectorWithSearch"
      />
      <TaskLibReportList reports={reports} />
    </>
  );
};
