import { dt } from "test/tools/selectors";
import { location } from "test/tools";

const VIEW = dt("task-fence-device-create");
export const TASK = {
  VIEW,
  NAME: dt(VIEW, "form-name-type", "fence-device-name"),
  AGENT_SELECT: dt(VIEW, "form-name-type", "fence-device-agent"),
  AGENT: dt(VIEW, "form-name-type", "fence-device-agent"),
  ATTR: (attrName: string) => dt(VIEW, `attr ${attrName}`),
  NEXT: dt(VIEW, "task-next"),
  SUCCESS: dt(VIEW, "task-success"),
};

const FENCE_DEVICE_LIST_URL = location.fenceDeviceList({
  clusterName: "actions",
});
export const url = {
  FENCE_DEVICE_LIST: FENCE_DEVICE_LIST_URL,
  TASK: `${FENCE_DEVICE_LIST_URL}?task=fenceDeviceCreate`,
};
