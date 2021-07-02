import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { useDispatch } from "app/view/share/useDispatch";
import { selectors } from "app/store";

import { TaskButtonNext } from "./TaskButtonNext";
import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";

export const WizardFooter: React.FC<
  {
    onClose: () => void;
    task:
      | Parameters<typeof selectors.getClusterTask>[0]
      | Parameters<typeof selectors.getDashboardTask>[0];
    onBack?: () => void;
    nextDisabled?: boolean;
    backDisabled?: boolean;
    nextLabel?: React.ComponentProps<typeof TaskButtonNext>["label"];
  } & (
    | {
        preNext?: () => void;
      }
    | {
        nextIf?: boolean;
      }
    | {
        next?: React.ReactNode;
      }
  )
> = (props) => {
  const {
    onBack,
    onClose,
    task,
    nextLabel = "Next",
    backDisabled = false,
    nextDisabled = false,
  } = props;

  const selectedClusterName = useSelectedClusterName();
  const clusterName =
    selectedClusterName.length > 0 ? selectedClusterName : null;
  const dispatch = useDispatch();
  return (
    <WizardContextConsumer>
      {({ onBack: pfOnBack, onNext }) => (
        <>
          {"next" in props && props.next !== undefined && <>{props.next}</>}
          {!("next" in props) && (
            <TaskButtonNext
              onClick={() => {
                if (!("nextIf" in props)) {
                  if ("preNext" in props && props.preNext !== undefined) {
                    props.preNext();
                  }
                  onNext();
                  return;
                }
                if (props.nextIf) {
                  dispatch({
                    type: "TASK.VALIDATION.HIDE",
                    key: { clusterName, task },
                  });
                  onNext();
                  return;
                }
                dispatch({
                  type: "TASK.VALIDATION.SHOW",
                  key: { clusterName, task },
                });
              }}
              disabled={nextDisabled}
              label={nextLabel}
            />
          )}
          <TaskButtonBack
            onClick={onBack || pfOnBack}
            disabled={backDisabled}
          />
          <TaskButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
