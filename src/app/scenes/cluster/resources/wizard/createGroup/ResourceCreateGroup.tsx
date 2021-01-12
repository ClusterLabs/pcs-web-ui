import React from "react";
import { Button, DualListSelector, Form, Modal } from "@patternfly/react-core";

import { FormText, WizardLibReports, WizardSuccess } from "app/view";

import { useWizard } from "./useWizard";

export const ResourceCreateGroup: React.FC = () => {
  const {
    close,
    updateState,
    createGroup,
    availableResources,
    state: { groupId, showValidationErrors, resourceIdList, response, reports },
  } = useWizard();

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

  let actions = [
    <Button
      key="CreateGroup"
      variant="primary"
      onClick={createGroup}
      isDisabled={groupId.length === 0 || resourceIdList.length < 2}
    >
      Create group
    </Button>,
    <Button key="Cancel" variant="link" onClick={close}>
      Cancel
    </Button>,
  ];

  if (response === "success") {
    actions = [
      <Button key="Cancel" variant="primary" onClick={close}>
        Close
      </Button>,
    ];
  }

  return (
    <Modal
      variant="large"
      title="Create group"
      isOpen
      onClose={close}
      actions={actions}
    >
      {response === "success" && (
        <WizardSuccess title={`Group "${groupId}" created successfully`} />
      )}

      {response !== "success" && (
        <>
          <Form data-test="create-group">
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
          </Form>
          <DualListSelector
            isSearchable
            availableOptions={availableResources}
            availableOptionsTitle="Available resources"
            chosenOptions={resourceIdList}
            chosenOptionsTitle="Choosen resources"
            onListChange={onListChange}
            id="basicSelectorWithSearch"
          />
        </>
      )}
      <WizardLibReports reports={reports} />
    </Modal>
  );
};
