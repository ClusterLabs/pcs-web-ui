import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";

export const Footer = () => {
  const {
    close,
    createGroup,
    state: { groupId, resourceIdList, response },
  } = useTask();

  if (response === "success") {
    return null;
  }
  return (
    <>
      <Button
        key="CreateGroup"
        variant="primary"
        onClick={createGroup}
        isDisabled={groupId.length === 0 || resourceIdList.length < 2}
      >
        Create group
      </Button>
      <Button key="Cancel" variant="link" onClick={close}>
        Cancel
      </Button>
    </>
  );
};
