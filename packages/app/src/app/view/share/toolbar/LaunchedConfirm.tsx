import {useDispatch} from "react-redux";
import {Button} from "@patternfly/react-core";
import {Modal} from "app/view/share/Modal";

import {testMarks} from "app/view/dataTest";
import {tools} from "app/store";

import type {LauncherItem} from "./types";

const {labelize} = tools;

const {task} = testMarks;

export const LaunchedConfirm = ({
  item,
  closeConfirm,
}: {
  item: Extract<LauncherItem, {confirm: unknown}>;
  closeConfirm: () => void;
}) => {
  const dispatch = useDispatch();
  const {confirm} = item;
  const run = "run" in confirm ? confirm.run : () => dispatch(confirm.action);
  return (
    <Modal
      variant="small"
      title={confirm.title}
      titleIconVariant={confirm.titleVariant}
      isOpen
      onClose={closeConfirm}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={() => {
            run();
            closeConfirm();
          }}
          {...task.confirm.run.mark}
        >
          {labelize(confirm.label ?? item.label ?? item.name)}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={closeConfirm}
          {...task.confirm.cancel.mark}
        >
          Cancel
        </Button>,
      ]}
      {...task.confirm.mark}
    >
      <span {...task.confirm.description.mark}>{confirm.description}</span>
    </Modal>
  );
};
