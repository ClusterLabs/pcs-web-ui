import React from "react";
import { Form, Radio } from "@patternfly/react-core";

import { useTask } from "./useTask";
import { GroupSelect } from "./GroupSelect";

export const GroupChangeForm: React.FC = () => {
  const {
    updateState,
    candidateGroupsIds,
    state: { action, resourceId, oldGroupId },
  } = useTask();

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
        <GroupSelect />
      </Form>
    );
  }

  if (candidateGroupsIds.length === 0) {
    return <>{`Remove resource "${resourceId}" from group "${oldGroupId}"`}</>;
  }

  return (
    <Form className="pf-u-mb-3xl">
      <Radio
        id="remove-group"
        isChecked={action === "remove-group"}
        name="remove-group"
        onChange={isChecked =>
          updateState({ action: isChecked ? "remove-group" : "set-group" })
        }
        label={`Remove resource "${resourceId}" from the group "${oldGroupId}"`}
      />

      <Radio
        id="set-group"
        isChecked={action === "set-group"}
        name="set-group"
        onChange={isChecked =>
          updateState({ action: isChecked ? "set-group" : "remove-group" })
        }
        label={`Move resource "${resourceId}" to a group`}
      />

      {action === "set-group" && <GroupSelect />}
    </Form>
  );
};
