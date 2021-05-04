import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";
import { useClusterSelector } from "app/view/share/useClusterSelector";

import { useTaskOpenClose } from "./useTaskOpenClose";

export function useClusterTask<
  NAME extends Parameters<typeof selectors.getTask>[0],
>(clusterPartName: NAME) {
  const [state, clusterName] = useClusterSelector(
    selectors.getTask(clusterPartName),
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
  };
}
