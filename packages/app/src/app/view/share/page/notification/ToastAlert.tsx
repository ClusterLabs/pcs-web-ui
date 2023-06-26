import {Alert, AlertActionCloseButton} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {useDispatch} from "app/view/share";

import {Notification} from "./types";
import {severityToVariant} from "./severityToVariant";
import {Description} from "./Description";

const {success, info, error} = testMarks.notifications.toast;

export const ToastAlert = ({notification}: {notification: Notification}) => {
  const dispatch = useDispatch();
  const variant = severityToVariant(notification.severity);
  const typeMark =
    notification.severity === "SUCCESS"
      ? success
      : notification.severity === "INFO"
      ? info
      : error;
  return (
    <Alert
      key={notification.id}
      variant={variant}
      {...typeMark.mark}
      actionClose={
        <AlertActionCloseButton
          {...typeMark.close.mark}
          onClose={() =>
            dispatch({
              type: "NOTIFICATION.REMOVE_FROM_TOAST",
              payload: {id: notification.id},
            })
          }
        />
      }
      title={<span {...typeMark.message.mark}>{notification.message}</span>}
    >
      <Description details={notification.details} />
    </Alert>
  );
};
