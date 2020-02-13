import React from "react";
import {
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

import { types } from "app/store";

import { StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

export const NodeListItem = ({ node }: { node: types.cluster.Node }) => (
  <DataListItem aria-labelledby={node.name}>
    <DataListItemRow>
      <DataListItemCells
        dataListCells={(
          <>
            <DataListCell>
              {node.name}
            </DataListCell>
            <DataListCell>
              {"Status "}
              <StatusSign
                status={node.statusSeverity}
                label={<strong>{toLabel(node.status)}</strong>}
                showOkIco
              />
            </DataListCell>
            <DataListCell>
              {"Quorum "}
              <StatusSign
                status={node.quorumSeverity}
                label={<strong>{toLabel(node.quorum)}</strong>}
                showOkIco
              />
            </DataListCell>
          </>
        )}
      />
    </DataListItemRow>
  </DataListItem>
);
