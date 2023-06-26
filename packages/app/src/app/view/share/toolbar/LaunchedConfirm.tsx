import {useDispatch} from "react-redux";
import {Button, Modal} from "@patternfly/react-core";

import {tools} from "app/store";

import {LauncherItem} from "./types";

const {labelize} = tools;

export const LaunchedConfirm = ({
  item,
  closeConfirm,
}: {
  item: Extract<LauncherItem, {confirm: unknown}>;
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
          {...(item.confirm.runMark ?? {"data-test": "confirm"})}
        >
          {labelize(item.label || item.name)}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={closeConfirm}
          {...(item.confirm.cancelMark ?? {"data-test": "cancel"})}
        >
          Cancel
        </Button>,
      ]}
      data-test={
        "data-test" in item.confirm
          ? item.confirm["data-test"]
          : `confirm ${item.name}`
      }
    >
      {item.confirm.description}
    </Modal>
  );
};
