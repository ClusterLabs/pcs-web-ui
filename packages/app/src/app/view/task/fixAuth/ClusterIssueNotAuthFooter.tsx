import {Button} from "@patternfly/react-core";

import {useTask} from "./useTask";
import {ClusterIssueNotAuthButton} from "./ClusterIssueNotAuthButton";

export const ClusterIssueNotAuthFooter = () => {
  const {
    cancel,
    fixAuthDone,
    state: {authProcessId, fixing, errorMessage, authAttemptInProgress},
  } = useTask();

  if (authProcessId) {
    return (
      <>
        <ClusterIssueNotAuthButton
          authProcessId={authProcessId}
          isDisabled={authAttemptInProgress}
        />
        <Button variant="link" onClick={cancel}>
          Cancel
        </Button>
      </>
    );
  }

  if (fixing) {
    return null;
  }

  if (errorMessage.length > 0) {
    return (
      <>
        <Button variant="primary" onClick={fixAuthDone}>
          Try again
        </Button>
        <Button variant="link" onClick={cancel}>
          Cancel
        </Button>
      </>
    );
  }

  return (
    <Button variant="primary" onClick={cancel}>
      Close
    </Button>
  );
};
