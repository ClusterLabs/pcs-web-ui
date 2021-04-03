import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useDispatch, useTaskOpenClose } from "app/view/share";
import { useClusterSelector } from "app/view/share/useClusterSelector";

export function useClusterTask<
  NAME extends Parameters<typeof selectors.getClusterPart>[0],
>(clusterPartName: NAME) {
  const [state, clusterName] = useClusterSelector(
    selectors.getClusterPart(clusterPartName),
  );
  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(clusterPartName);
  const pfWizardContext = React.useContext(WizardContext);

  return {
    // don't spread wizardContext to avoid conflict if patternfly adds something
    wizard: pfWizardContext,
    state,
    ...openClose,
    clusterName,
    dispatch,
    tryNext: (isValid: boolean) => {
      if (isValid) {
        dispatch({
          type: "CLUSTER.TASK.VALIDATION.HIDE",
          key: { clusterName },
        });
        pfWizardContext.onNext();
      } else {
        dispatch({
          type: "CLUSTER.TASK.VALIDATION.SHOW",
          key: { clusterName },
        });
      }
    },
  };
}
