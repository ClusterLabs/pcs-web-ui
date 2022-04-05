import React from "react";
import {
  ActionListItem,
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Modal,
} from "@patternfly/react-core";

import { tools } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";

import { ConfirmAction, ConfirmData } from "./clusterGroupDetail/Types";

export type ModalAction = { disabled?: boolean } & (
  | { onClick: () => void }
  | ConfirmAction
);

type ModalActionMap = Record<string, ModalAction>;

const { capitalize } = tools;

export const DropdownActionListMenu: React.FC<{
  dropdownActions: ModalActionMap;
}> = ({ dropdownActions }) => {
  const [kebabOpen, setKebabOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState<ConfirmData | null>(null);
  const dispatch = useDispatch();

  const prepareOnClick = (action: ModalAction, name: string) =>
    "confirm" in action
      ? () =>
          setConfirm({
            confirm: action.confirm,
            action: action.action,
            name,
          })
      : action.onClick;

  const closeConfirm = () => setConfirm(null);

  return (
    <>
      <ActionListItem>
        <Dropdown
          toggle={<KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />}
          onSelect={() => setKebabOpen(false)}
          isOpen={kebabOpen}
          isPlain
          dropdownItems={Object.keys(dropdownActions).map(name => (
            <DropdownItem
              key={name}
              component="button"
              onClick={prepareOnClick(dropdownActions[name], name)}
              data-test={`${name}-cluster`}
            >
              {capitalize(name)}
            </DropdownItem>
          ))}
          position="right"
        />
      </ActionListItem>

      {confirm && (
        <Modal
          variant="small"
          title={confirm.confirm.title}
          isOpen
          onClose={closeConfirm}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              onClick={() => {
                dispatch(confirm.action);
                closeConfirm();
              }}
              data-test="confirm"
            >
              {capitalize(confirm.name)}
            </Button>,
            <Button
              key="cancel"
              variant="link"
              onClick={closeConfirm}
              data-test="cancel"
            >
              Cancel
            </Button>,
          ]}
          data-test={`confirm ${confirm.name}`}
        >
          {confirm.confirm.description}
        </Modal>
      )}
    </>
  );
};
