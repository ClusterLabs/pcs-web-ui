import {DataListCell, DataListItemCells} from "@patternfly/react-core";

import {
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";
import {ResourceStatus} from "app/view/cluster/types";

import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeCellStatus} from "./ResourceTreeCellStatus";

export const ResourceTreeItemCells = ({
  resourceId,
  status,
  type,
  typeDescription = "",
}: {
  resourceId: string;
  status: ResourceStatus;
  type: string;
  typeDescription?: string;
}) => {
  const {selectedItemUrlName} = useGroupDetailViewContext();
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell key={resourceId}>
            <ResourceTreeCellName resourceId={resourceId} />
          </DataListCell>,
          <DataListCell key={`${resourceId}.type`}>
            <ResourceTreeCellType
              type={type}
              typeDescription={typeDescription}
            />
          </DataListCell>,
        ]}
      />
      <ResourceTreeCellStatus status={status} />
      {selectedItemUrlName !== "" && (
        <SelectionIndicatorInGroup
          isSelected={resourceId === selectedItemUrlName}
        />
      )}
    </>
  );
};
