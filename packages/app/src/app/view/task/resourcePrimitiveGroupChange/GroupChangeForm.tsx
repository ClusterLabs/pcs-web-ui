import {Form, Radio} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

import {useTask} from "./useTask";
import {GroupSelect} from "./GroupSelect";
import {PositionSelect} from "./PositionSelect";

const {resourcePrimitiveGroupChange: task} = testMarks.task;

export const GroupChangeForm = () => {
  const {
    updateState,
    candidateGroupsIds,
    state: {action, resourceId, oldGroupId},
  } = useTask();

  const updateAction = (newAction: typeof action) => (isChecked: boolean) => {
    if (isChecked) {
      updateState({action: newAction});
    }
  };

  if (oldGroupId === "") {
    if (candidateGroupsIds.length === 0) {
      return (
        <>
          Nothing to do. The resource is not in a group and there is no group
          into which the resource could be added.
        </>
      );
    }

    return (
      <Form className="pf-u-mb-3xl">
        <div className="pf-u-mb-3xl">
          <GroupSelect />
        </div>
      </Form>
    );
  }

  return (
    <Form className="pf-u-mb-3xl">
      <Radio
        id="move-in-group"
        isChecked={action === "move-in-group"}
        name="move-in-group"
        onChange={updateAction("move-in-group")}
        label={`Move resource "${resourceId}" inside current group "${oldGroupId}"`}
        {...task.moveInGroup.mark}
      />
      {action === "move-in-group" && (
        <div className="pf-u-mb-md pf-u-ml-lg">
          <PositionSelect />
        </div>
      )}
      <Radio
        id="remove-group"
        isChecked={action === "remove-group"}
        name="remove-group"
        onChange={updateAction("remove-group")}
        label={`Remove resource "${resourceId}" from the group "${oldGroupId}"`}
        {...task.removeGroup.mark}
      />

      {candidateGroupsIds.length > 0 && (
        <>
          <Radio
            id="set-group"
            isChecked={action === "set-group"}
            name="set-group"
            onChange={updateAction("set-group")}
            label={`Move resource "${resourceId}" to a group`}
            {...task.setGroup.mark}
          />

          {action === "set-group" && (
            <div className="pf-u-mb-3xl pf-u-ml-lg">
              <GroupSelect />
            </div>
          )}
        </>
      )}
    </Form>
  );
};
