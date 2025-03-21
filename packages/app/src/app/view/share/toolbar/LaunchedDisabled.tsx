import {Button} from "@patternfly/react-core";
import {Modal} from "app/view/share/Modal";

import type {LauncherItem} from "./types";

export const LaunchedDisabled = ({
  item,
  close,
}: {
  item: LauncherItem;
  close: () => void;
}) => {
  return (
    <Modal
      variant="small"
      title={item.launchDisable?.title || "Launch disabled"}
      isOpen
      onClose={close}
      actions={[
        <Button key="cancel" variant="primary" onClick={close}>
          Close
        </Button>,
      ]}
    >
      {item.launchDisable?.message || "Launch disabled"}
    </Modal>
  );
};
