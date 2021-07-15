import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Modal,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";
import { push } from "connected-react-router";

import { useGroupDetailViewContext } from "./GroupDetailViewContext";
import { ConfirmAction, ConfirmData } from "./Types";

export type DetailLayoutToolbarAction = { disabled?: boolean } & (
  | { onClick: () => void }
  | ConfirmAction
);

type ToolbarActionMap = Record<string, DetailLayoutToolbarAction>;

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const DetailLayoutToolbar: React.FC<{
  toolbarName: string;
  buttonActions?: ToolbarActionMap;
  dropdownActions?: ToolbarActionMap;
}> = ({ toolbarName, buttonActions = {}, dropdownActions = {} }) => {
  const dispatch = useDispatch();
  const { urlPrefix } = useGroupDetailViewContext();
  const [confirm, setConfirm] = React.useState<ConfirmData | null>(null);
  const [kebabOpen, setKebabOpen] = React.useState(false);

  const prepareOnClick = (action: DetailLayoutToolbarAction, name: string) =>
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
      <Toolbar id="group-detail-layout-detail-toolbar">
        <ToolbarContent>
          {Object.keys(buttonActions).map(name => (
            <ToolbarItem key={name}>
              <Button
                variant="secondary"
                onClick={prepareOnClick(buttonActions[name], name)}
                isDisabled={
                  "disabled" in buttonActions[name]
                  && buttonActions[name].disabled
                }
                data-test={`toolbar-${toolbarName}-${name}`}
              >
                {capitalize(name)}
              </Button>
            </ToolbarItem>
          ))}

          {dropdownActions && (
            <ToolbarItem>
              <Dropdown
                toggle={
                  <KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />
                }
                onSelect={() => setKebabOpen(false)}
                isOpen={kebabOpen}
                isPlain
                dropdownItems={Object.keys(dropdownActions).map(name => (
                  <DropdownItem
                    key={name}
                    component="button"
                    onClick={prepareOnClick(dropdownActions[name], name)}
                  >
                    {capitalize(name)}
                  </DropdownItem>
                ))}
              />
            </ToolbarItem>
          )}

          <ToolbarItem>
            <Button
              variant="plain"
              aria-label="Close panel"
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                dispatch(push(`${urlPrefix}/`));
              }}
            >
              <TimesIcon />
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
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
              data-test={`toolbar-confirm-${toolbarName}-${confirm.name}`}
            >
              {capitalize(confirm.name)}
            </Button>,
            <Button
              key="cancel"
              variant="link"
              onClick={closeConfirm}
              data-test={`toolbar-cancel-${toolbarName}-${confirm.name}`}
            >
              Cancel
            </Button>,
          ]}
        >
          {confirm.confirm.description}
        </Modal>
      )}
    </>
  );
};
