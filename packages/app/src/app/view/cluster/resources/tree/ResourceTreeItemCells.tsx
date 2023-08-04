import {DataListCell, DataListItemCells} from "@patternfly/react-core";

import {
  SelectionIndicatorInGroup,
  useGroupDetailViewContext,
} from "app/view/share";

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
