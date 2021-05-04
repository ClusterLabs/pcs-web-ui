import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { useDispatch } from "app/view/share/useDispatch";

import { TaskButtonNext } from "./TaskButtonNext";
import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";

export const ClusterWizardFooter: React.FC<
  {
    onClose: () => void;
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
    nextLabel = "Next",
    backDisabled = false,
    nextDisabled = false,
  } = props;

  const clusterName = useSelectedClusterName();
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
                    type: "CLUSTER.TASK.VALIDATION.HIDE",
                    key: { clusterName },
                  });
                  onNext();
                  return;
                }
                dispatch({
                  type: "CLUSTER.TASK.VALIDATION.SHOW",
                  key: { clusterName },
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
