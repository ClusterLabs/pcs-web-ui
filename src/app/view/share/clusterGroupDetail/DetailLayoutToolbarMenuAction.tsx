import React from "react";
import { Button, Modal } from "@patternfly/react-core";

import { Action } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";

export const DetailLayoutToolbarMenuAction: React.FC<{
  name: string;
  title: string;
  confirmationLabel: string;
  action: Action;
}> = ({ name, title, confirmationLabel, children, action }) => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <button
        aria-label={name}
        type="button"
        onClick={() => setConfirmOpen(!confirmOpen)}
      >
        {name}
      </button>
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
