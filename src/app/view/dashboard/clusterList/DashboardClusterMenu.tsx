import React from "react";
import {
  ActionListItem,
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Modal,
} from "@patternfly/react-core";

import { useDispatch } from "app/view/share";

export const DashboardClusterMenu: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dropdownItems = [
    <DropdownItem
      key="confirmation"
      component="button"
      onClick={() => setIsModalOpen(true)}
      data-test="remove-cluster"
    >
      Remove cluster
    </DropdownItem>,
  ];

  return (
    <>
      <ActionListItem>
        <Dropdown
          isOpen={isOpen}
          onSelect={() => setIsOpen(!isOpen)}
          toggle={<KebabToggle onToggle={() => setIsOpen(!isOpen)} />}
          isPlain
          dropdownItems={dropdownItems}
          position="right"
        />
      </ActionListItem>

      {isModalOpen && (
        <Modal
          variant="small"
          title={`Remove the cluster "${clusterName}"?`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              onClick={() => {
                dispatch({
                  type: "DASHBOARD.CLUSTER.REMOVE",
                  payload: { clusterName },
                });
                setIsModalOpen(!isModalOpen);
              }
            }
            data-test="remove"
            >
              Remove
            </Button>,
            <Button
              key="cancel"
              variant="link"
              onClick={() => setIsModalOpen(!isModalOpen)}
              data-test="cancel"
            >
              Cancel
            </Button>,
          ]}
        >
          This only removes the cluster from the Web UI, 
          it does not stop the cluster from running.
        </Modal>
      )}
    </>
  );
};
