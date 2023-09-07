import {DataListCell, DataListItemCells} from "@patternfly/react-core";

import {SelectionIndicatorInGroup} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";

export const ResourceTreeItemCells = ({
  resourceId,
  idCell,
  typeCell,
  statusCell,
}: {
  resourceId: string;
  idCell: React.ReactNode;
  typeCell: React.ReactNode;
  statusCell: React.ReactNode;
}) => {
  const {selectedItemUrlName} = useGroupDetailViewContext();
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell key="resourceId">{idCell}</DataListCell>,
          <DataListCell key="resourceType">{typeCell}</DataListCell>,
        ]}
      />
      {statusCell}
      {selectedItemUrlName !== "" && (
        <SelectionIndicatorInGroup
          isSelected={resourceId === selectedItemUrlName}
        />
      )}
    </>
  );
};
