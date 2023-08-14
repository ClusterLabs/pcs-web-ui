import * as React from "react";
import {StackItem} from "@patternfly/react-core";

import {NVPair} from "app/view/cluster/types";

import {NVPairListView} from "./NVPairListView";

export const NVPairListPage = ({
  nvPairList,
  toolbar,
  beforeList,
  itemMenu,
}: {
  nvPairList: NVPair[];
  toolbar: React.ReactNode;
  beforeList?: React.ReactNode;
  itemMenu: React.ComponentProps<typeof NVPairListView>["itemMenu"];
}) => {
  return (
    <>
      <StackItem>{toolbar}</StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        <NVPairListView nvPairList={nvPairList} itemMenu={itemMenu} />
      </StackItem>
    </>
  );
};
