import { useDispatch } from "react-redux";
import { Button, Modal } from "@patternfly/react-core";

import { tools } from "app/store";

import { LauncherItem } from "./types";

const { capitalize } = tools;

export const LaunchedConfirm = ({
  item,
  toolbarName,
  closeConfirm,
}: {
  item: Extract<LauncherItem, { confirm: unknown }>;
  toolbarName: string;
  closeConfirm: () => void;
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      variant="small"
      title={item.confirm.title}
      isOpen
      onClose={closeConfirm}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={() => {
            dispatch(item.confirm.action);
            closeConfirm();
          }}
          data-test={`toolbar-confirm-${toolbarName}-${item.name}`}
        >
          {capitalize(item.label || item.name)}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={closeConfirm}
          data-test={`toolbar-cancel-${toolbarName}-${item.name}`}
        >
          Cancel
        </Button>,
      ]}
    >
      {item.confirm.description}
    </Modal>
  );
};
