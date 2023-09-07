import {FenceDevice} from "app/view/cluster/types";
import {IssueList} from "app/view/share";
import {
  DetailViewSection,
  LoadedPcmkAgent,
  PcmkAgentDescription,
} from "app/view/cluster/share";

export const FenceDeviceDetailView = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <>
      <DetailViewSection caption="Description">
        <LoadedPcmkAgent agentName={fenceDevice.agentName}>
          {agent => (
            <PcmkAgentDescription
              name={agent.name}
              shortdesc={agent.shortdesc}
              longdesc={agent.longdesc}
            />
          )}
        </LoadedPcmkAgent>
      </DetailViewSection>
      {fenceDevice.issueList.length > 0 && (
        <DetailViewSection caption="Issues">
          <IssueList issueList={fenceDevice.issueList} hideEmpty />
        </DetailViewSection>
      )}
    </>
  );
};
