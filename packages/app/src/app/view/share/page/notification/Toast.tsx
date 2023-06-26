import {AlertGroup} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

import {Notification} from "./types";
import {ToastAlert} from "./ToastAlert";

export const Toast = ({
  notificationList,
}: {
  notificationList: Notification[];
}) => {
  return (
    <AlertGroup isToast isLiveRegion {...testMarks.notifications.toast.mark}>
      {notificationList
        .filter(n => n.inToast)
        .map(n => (
          <ToastAlert key={n.id} notification={n} />
        ))}
    </AlertGroup>
  );
};
