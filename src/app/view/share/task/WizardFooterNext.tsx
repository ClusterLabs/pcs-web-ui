import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { useDispatch } from "app/view/share/useDispatch";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";

import { useWizardContext } from "./WizardContext";
import { TaskButtonNext } from "./TaskButtonNext";

export const WizardFooterNext = (
  props: {
    disabled?: boolean;
    label?: React.ComponentProps<typeof TaskButtonNext>["label"];
  } & (
    | { preAction?: () => void }
    | { actionIf?: boolean }
    | { action?: () => void }
  ),
) => {
  // Empty cluster name means that it is not in the context of cluster - ie. it
  // is dashboard. To make actions usable for dashboard tasks the key
  // clusterName must be null (so it is not propagated into cluster tasks)
  const selectedClusterName = useSelectedClusterName();
  const clusterName =
    selectedClusterName.length > 0 ? selectedClusterName : null;
  const dispatch = useDispatch();

  const { onNext } = React.useContext(WizardContext);
  const { task } = useWizardContext();

  const runNext = React.useCallback(() => {
    if ("action" in props && props.action) {
      props.action();
      return;
    }
    if ("actionIf" in props) {
      if (props.actionIf) {
        dispatch({
          type: "TASK.VALIDATION.HIDE",
          key: { clusterName, task },
        });
        onNext();
      } else {
        dispatch({
          type: "TASK.VALIDATION.SHOW",
          key: { clusterName, task },
        });
      }
      return;
    }
    if ("preAction" in props && props.preAction) {
      props.preAction();
    }
    onNext();
  }, [props, task, onNext, dispatch, clusterName]);

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
        runNext();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [runNext]);

  return (
    <TaskButtonNext
      onClick={runNext}
      disabled={props.disabled ?? false}
      label={props.label ?? "Next"}
    />
  );
};
