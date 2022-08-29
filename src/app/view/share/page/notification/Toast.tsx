import { AlertGroup } from "@patternfly/react-core";

import { Notification } from "./types";
import { ToastAlert } from "./ToastAlert";

export const Toast = ({
  notificationList,
}: {
  notificationList: Notification[];
}) => {
  return (
    <AlertGroup isToast isLiveRegion>
      {notificationList
        .filter(n => n.inToast)
        .reverse()
        .map(n => (
          <ToastAlert key={n.id} notification={n} />
        ))}
    </AlertGroup>
  );
};
