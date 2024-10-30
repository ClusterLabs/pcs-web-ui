import {DataListItem, DataListItemRow} from "@patternfly/react-core";

import {FenceDevice} from "app/view/cluster/types";
import {StatusIco, StatusSign} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";

import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";
import {ResourceTreeItemCells} from "./ResourceTreeItemCells";

export const ResourceTreeItemFenceDevice = ({
  fenceDevice,
  nestingLevel,
}: {
  fenceDevice: FenceDevice;
  nestingLevel: 0 | 1 | 2;
}) => {
  const {compact} = useGroupDetailViewContext();
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${fenceDevice.id}`}
      id={fenceDevice.id}
    >
      <DataListItemRow>
        <ResourceTreeItemCells
          nestingLevel={nestingLevel ?? 0}
          idCell={<ResourceTreeCellName resourceId={fenceDevice.id} />}
          typeCell={
            <ResourceTreeCellType
              type={fenceDevice.type}
              typeDescription="stonith"
            />
          }
          statusCell={
            <>
              {compact && (
                <div className="ha-c-data-list__item-status">
                  <StatusIco status="ERROR" />
                  {fenceDevice.statusSeverity !== "OK" && " 1"}
                </div>
              )}
              {!compact && (
                <div className="ha-c-data-list__item-status">
                  <StatusSign status="ERROR" label="Bad placement" />
                </div>
              )}
            </>
          }
        />
      </DataListItemRow>
    </DataListItem>
  );
};
