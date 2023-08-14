import * as React from "react";

import {Table} from "app/view/share";
import {NVPair} from "app/view/cluster/types";

export const NVPairList = (props: {
  nvPairList: NVPair[];
  itemMenu: (nvPairName: string, nvPairValue: string) => React.ReactNode;
}) => {
  return (
    <Table>
      <Table.Body data-test="nvpair-list">
        {props.nvPairList.map(nvPair => {
          return (
            <tr key={nvPair.id} data-test={`nvpair ${nvPair.id}`}>
              <td data-label="name">{nvPair.name}</td>
              <td data-label="value">{nvPair.value}</td>
              <td data-label="Menu">
                {props.itemMenu(nvPair.name, nvPair.value)}
              </td>
            </tr>
          );
        })}
      </Table.Body>
    </Table>
  );
};
