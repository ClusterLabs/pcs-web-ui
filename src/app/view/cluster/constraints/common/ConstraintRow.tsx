import React from "react";
import {
  Button,
  DataListAction,
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
  Modal,
} from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";

import { Action } from "app/store";
import { useDispatch, useSelectedClusterName } from "app/view/share";

export const ConstraintRow: React.FC<{
  id?: string;
  content?: React.ReactNode;
  dataListCells: React.ComponentProps<
    typeof DataListItemCells
  >["dataListCells"];
  canDelete?: boolean;
  deleteAction?: Action;
}> = ({
  id = "",
  dataListCells,
  content = null,
  canDelete = true,
  deleteAction,
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const rowId = `constraint-${id}-row`;
  const [showConfirm, setShowConfirm] = React.useState(false);
  const dispatch = useDispatch();
  const clusterName = useSelectedClusterName();
  return (
    <DataListItem aria-labelledby={rowId} isExpanded={showDetails}>
      <DataListItemRow id={rowId}>
        <DataListToggle
          onClick={() => setShowDetails(!showDetails)}
          isExpanded={showDetails}
          id={`constraint-row-${id}`}
          aria-controls={`details-constraint-${id}`}
          aria-hidden={content === null}
        />
        <DataListItemCells dataListCells={dataListCells} />
        {canDelete && (
          <DataListAction
            aria-labelledby="check-action-item1 check-action-action1"
            id="check-action-action1"
            aria-label="Actions"
            isPlainButtonAction
          >
            <Button
              onClick={() => setShowConfirm(true)}
              variant="link"
              key="delete-action"
              icon={<TrashIcon />}
            />
            {showConfirm && (
              <Modal
                variant="small"
                title="Delete constraint"
                isOpen
                onClose={() => setShowConfirm(false)}
                actions={[
                  <Button
                    key="confirm"
                    variant="primary"
                    onClick={() => {
                      dispatch(
                        deleteAction || {
                          type: "CONSTRAINT.DELETE",
                          key: { clusterName },
                          payload: { constraintId: id },
                        },
                      );
                      setShowConfirm(false);
                    }}
                  >
                    Delete
                  </Button>,
                  <Button
                    key="cancel"
                    variant="link"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                {`Delete constraint "${id}"?`}
              </Modal>
            )}
          </DataListAction>
        )}
      </DataListItemRow>
      <DataListContent
        aria-label={`Details of constraint ${id}`}
        id={`details-constraint-${id}`}
        isHidden={content === null || !showDetails}
      >
        {content}
      </DataListContent>
    </DataListItem>
  );
};
