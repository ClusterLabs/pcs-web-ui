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

import { tools } from "app/store";

import { useGroupDetailViewContext } from "./GroupDetailViewContext";
import { ConfirmAction, ConfirmData } from "./Types";

export type DetailLayoutToolbarAction = { disabled?: boolean } & (
  | { onClick: () => void }
  | ConfirmAction
);

type DetailLayoutToolbarActionOrComponent =
  | DetailLayoutToolbarAction
  | Exclude<React.ReactNode, undefined | null>;

const { capitalize } = tools;

export const DetailLayoutToolbar = ({
  toolbarName,
  buttonActions = {},
  dropdownActions = {},
}: {
  toolbarName: string;
  buttonActions?: Record<string, DetailLayoutToolbarActionOrComponent>;
  dropdownActions?: Record<string, DetailLayoutToolbarAction>;
}) => {
  const dispatch = useDispatch();
  const { closeDetailUrl } = useGroupDetailViewContext();
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
          {Object.keys(buttonActions).map((name) => {
            const buttonAction = buttonActions[name];
            return (
              <ToolbarItem key={name}>
                {typeof buttonAction === "object"
                && ("confirm" in buttonAction || "onClick" in buttonAction) ? (
                  <Button
                    variant="secondary"
                    onClick={prepareOnClick(buttonAction, name)}
                    isDisabled={
                      "disabled" in buttonAction && buttonAction.disabled
                    }
                    data-test={`toolbar-${toolbarName}-${name}`}
                  >
                    {capitalize(name)}
                  </Button>
                ) : (
                  buttonAction
                )}
              </ToolbarItem>
            );
          })}

          {Object.keys(dropdownActions).length > 0 && (
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
                closeDetailUrl();
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
