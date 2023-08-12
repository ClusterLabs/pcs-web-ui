import * as React from "react";
import {StackItem} from "@patternfly/react-core";

import {ActionPayload} from "app/store";
import {NVPair} from "app/view/cluster/types";

import {NVPairListView} from "./NVPairListView";

export const NVPairListPage = ({
  nvPairList,
  owner,
  toolbar,
  beforeList,
}: {
  nvPairList: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
  toolbar: React.ReactNode;
  beforeList?: React.ReactNode;
}) => {
  return (
    <>
      <StackItem>{toolbar}</StackItem>

      {beforeList && <StackItem>{beforeList}</StackItem>}

      <StackItem>
        <NVPairListView nvPairList={nvPairList} owner={owner} />
      </StackItem>
    </>
  );
};
