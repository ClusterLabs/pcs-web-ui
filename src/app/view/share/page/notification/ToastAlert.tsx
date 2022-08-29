import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

import { useDispatch } from "app/view/share";

import { Notification } from "./types";
import { severityToVariant } from "./severityToVariant";
import { Description } from "./Description";

export const ToastAlert = ({
  notification,
}: {
  notification: Notification;
}) => {
  const dispatch = useDispatch();
  const variant = severityToVariant(notification.severity);
  return (
    <Alert
      key={notification.id}
      variant={variant}
      data-test={`notification-${variant}`}
      actionClose={
        <AlertActionCloseButton
          onClose={() =>
            dispatch({
              type: "NOTIFICATION.REMOVE_FROM_TOAST",
              payload: { id: notification.id },
            })
          }
        />
      }
      title={notification.message}
    >
      <Description details={notification.details} />
    </Alert>
  );
};
