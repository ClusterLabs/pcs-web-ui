import {Button, WizardContextConsumer} from "@patternfly/react-core";

import {useDispatch} from "app/view/share/useDispatch";

import {useTaskContext} from "../TaskContext";

export const TaskButtonReviewAndFinish = (props: {
  disabled?: boolean;
  onClick?: () => void;
  runIf?: boolean;
  label?: string;
  "data-test"?: string;
}) => {
  const {task} = useTaskContext();
  const dispatch = useDispatch();
  return (
    <WizardContextConsumer>
      {({goToStepByName}) => (
        <Button
          variant="tertiary"
          type="submit"
          onClick={
            props.onClick
            ?? (() => {
              if (props.runIf || props.runIf === undefined) {
                dispatch({
                  type: "TASK.VALIDATION.HIDE",
                  key: {task},
                });
                goToStepByName("Review");
              } else {
                dispatch({
                  type: "TASK.VALIDATION.SHOW",
                  key: {task},
                });
              }
            })
          }
          data-test={props["data-test"] ?? "review-and-finish"}
          isDisabled={props.disabled ?? false}
        >
          {props.label ?? "Review and finish"}
        </Button>
      )}
    </WizardContextConsumer>
  );
};
