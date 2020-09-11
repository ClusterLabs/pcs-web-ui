import React from "react";
import { Button, Modal } from "@patternfly/react-core";

import { actions, useDispatch } from "app/store";

export const DetailLayoutToolbarAction: React.FC<{
  name: string;
  title: string;
  confirmationLabel: string;
  action: actions.Action;
}> = ({ name, title, confirmationLabel, children, action }) => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        variant="secondary"
        aria-label={name}
        onClick={() => setConfirmOpen(!confirmOpen)}
      >
        {name}
      </Button>
      <Modal
        variant="small"
        title={title}
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        actions={[
          <Button
            key="confirm"
            variant="primary"
            onClick={() => {
              dispatch(action);
              setConfirmOpen(!confirmOpen);
            }}
          >
            {confirmationLabel}
          </Button>,
          <Button
            key="cancel"
            variant="link"
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
