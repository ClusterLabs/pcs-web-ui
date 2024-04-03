import {DataListCell, DataListItemCells} from "@patternfly/react-core";

export const ResourceTreeItemCells = ({
  idCell,
  typeCell,
  statusCell,
}: {
  idCell: React.ReactNode;
  typeCell: React.ReactNode;
  statusCell: React.ReactNode;
}) => {
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell key="resourceId">{idCell}</DataListCell>,
          <DataListCell key="resourceType">{typeCell}</DataListCell>,
        ]}
      />
      {statusCell}
    </>
  );
};
