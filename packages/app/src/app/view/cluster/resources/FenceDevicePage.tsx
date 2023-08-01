import {Alert} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";
import {DetailLayout, ResourceDetailCaption} from "app/view/share";

const {currentResurce} = testMarks.cluster.resources;

export const FenceDevicePage = ({fenceDevice}: {fenceDevice: FenceDevice}) => {
  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={fenceDevice.id}
          type={fenceDevice.type}
          {...currentResurce.fenceDevice.id}
        />
      }
      {...currentResurce.mark}
    >
      <Alert variant="danger" isInline title="Unsupported fence device context">
        Cloned fence device or fence device inside group is not supported.
        Please unclone / remove this fence device from the group via pcs.
      </Alert>
    </DetailLayout>
  );
};
