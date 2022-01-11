import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";
import { useDispatch } from "app/view/share/useDispatch";
import { selectors } from "app/store";

import { TaskButtonNext } from "./TaskButtonNext";
import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";
import { TaskButtonReviewAndFinish } from "./TaskButtonReviewAndFinish";

export const WizardFooter = (
  props: {
    onClose: () => void;
    task:
      | Parameters<typeof selectors.getClusterTask>[0]
      | Parameters<typeof selectors.getDashboardTask>[0];
    onBack?: () => void;
    nextDisabled?: boolean;
    backDisabled?: boolean;
    nextLabel?: React.ComponentProps<typeof TaskButtonNext>["label"];
    reviewAndFinish?: {
      label: string;
    };
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
  ),
) => {
  const {
    onBack,
    onClose,
    task,
    nextLabel = "Next",
    backDisabled = false,
    nextDisabled = false,
  } = props;

  const selectedClusterName = useSelectedClusterName();
  // Empty cluster name means that it is not in the context of cluster - ie. it
  // is dashboard. To make actions usable for dashboard tasks the key
  // clusterName must be null (so it is not propagated into cluster tasks)
  const clusterName =
    selectedClusterName.length > 0 ? selectedClusterName : null;
  const dispatch = useDispatch();
  return (
    <WizardContextConsumer>
      {({ onBack: pfOnBack, onNext, goToStepByName }) => (
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
          {props.reviewAndFinish !== undefined && (
            <TaskButtonReviewAndFinish
              onClick={() => goToStepByName("Review")}
              label={props.reviewAndFinish.label}
            />
          )}
          <TaskButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
