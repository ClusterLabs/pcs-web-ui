import { Button, Modal } from "@patternfly/react-core";

import { LauncherItem } from "./types";

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
        <Button
          key="cancel"
          variant="primary"
          onClick={close}
          data-test={"close"}
        >
          Close
        </Button>,
      ]}
      data-test={`disabled launch ${item.name}`}
    >
      {item.launchDisable?.message || "Launch disabled"}
    </Modal>
  );
};
