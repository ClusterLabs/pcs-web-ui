import * as React from "react";
import {StackItem} from "@patternfly/react-core";

import {NVPair} from "app/view/cluster/types";

import {NVPairListView} from "./NVPairListView";

export const NVPairListPage = ({
  nvPairList,
  toolbar,
  beforeList,
  menu,
}: {
  nvPairList: NVPair[];
  toolbar: React.ReactNode;
  beforeList?: React.ReactNode;
  menu: React.ComponentProps<typeof NVPairListView>["menu"];
}) => {
  return (
    <>
      <StackItem>{toolbar}</StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        <NVPairListView nvPairList={nvPairList} menu={menu} />
      </StackItem>
    </>
  );
};
