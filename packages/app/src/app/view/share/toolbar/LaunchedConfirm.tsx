import {useDispatch} from "react-redux";
import {Button, Modal} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {tools} from "app/store";

import {LauncherItem} from "./types";

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
  return (
    <Modal
      variant="small"
      header={
        <h1 className="pf-c-modal-box__title" {...task.confirm.title.mark}>
          {item.confirm.title}
        </h1>
      }
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
          {...task.confirm.run.mark}
        >
          {labelize(item.label || item.name)}
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
      <span {...task.confirm.description.mark}>{item.confirm.description}</span>
    </Modal>
  );
};
