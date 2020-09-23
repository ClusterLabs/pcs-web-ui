import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Modal,
} from "@patternfly/react-core";

import { actions, useDispatch } from "app/store";

type Action = actions.Action;
type Confirm = {
  title: string;
  description: React.ReactNode;
};

export const DetailLayoutToolbarDropdown: React.FC<{
  menuItems: Record<
    string,
    {
      confirm?: Confirm;
      action: Action;
    }
  >;
}> = ({ menuItems }) => {
  const [kebabIsOpen, setKebabIsOpen] = React.useState(false);
  const [modal, setModal] = React.useState<{
    confirm: Confirm;
    action: Action;
    label: string;
  } | null>(null);
  const dispatch = useDispatch();

  return (
    <>
      <Dropdown
        toggle={<KebabToggle onToggle={() => setKebabIsOpen(!kebabIsOpen)} />}
        onSelect={() => setKebabIsOpen(false)}
        isOpen={kebabIsOpen}
        isPlain
        dropdownItems={Object.keys(menuItems).map(name => (
          <DropdownItem
            key={name}
            component="button"
            onClick={() => {
              const item = menuItems[name];
              if (item.confirm !== undefined) {
                setModal({
                  confirm: item.confirm,
                  action: item.action,
                  label: name,
                });
              } else {
                dispatch(item.action);
              }
            }}
          >
            {name}
          </DropdownItem>
        ))}
      />
      {modal !== null && (
        <Modal
          variant="small"
          title={modal.confirm.title}
          isOpen
          onClose={() => setModal(null)}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              onClick={() => {
                dispatch(modal.action);
                setModal(null);
              }}
            >
              {modal.label}
            </Button>,
            <Button key="cancel" variant="link" onClick={() => setModal(null)}>
              Cancel
            </Button>,
          ]}
        >
          {modal.confirm.description}
        </Modal>
      )}
    </>
  );
};
