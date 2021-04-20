import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { TaskLibStep } from "app/view/share";

import { useTask } from "../useTask";

export const NodeAddReview: React.FC = () => {
  const {
    isSbdEnabled,
    filledSbdDevices,
    filledNodeAddresses,
    state: { nodeName, reports, sbdWatchdog, sbdNoWatchdogValidation },
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>Node name</DescriptionListTerm>
          <DescriptionListDescription>{nodeName}</DescriptionListDescription>
        </DescriptionListGroup>

        <DescriptionListGroup>
          <DescriptionListTerm>Node addresses</DescriptionListTerm>
          <DescriptionListDescription>
            {filledNodeAddresses.length === 0 ? (
              <>No address configured</>
            ) : (
              filledNodeAddresses.map((a, i) => <div key={i}>{a}</div>)
            )}
          </DescriptionListDescription>
        </DescriptionListGroup>

        {isSbdEnabled && (
          <>
            <DescriptionListGroup>
              <DescriptionListTerm>Sbd watchdog</DescriptionListTerm>
              <DescriptionListDescription>
                {sbdWatchdog.length > 0 && sbdWatchdog}
                {sbdWatchdog.length === 0 && (
                  <>
                    <div>/dev/watchdog</div>
                    <div style={{ fontStyle: "italic" }}>Default value</div>
                  </>
                )}
              </DescriptionListDescription>
            </DescriptionListGroup>

            <DescriptionListGroup>
              <DescriptionListTerm>Sbd watchdog validation</DescriptionListTerm>
              <DescriptionListDescription>
                {sbdNoWatchdogValidation ? "Disabeld" : "Enabled"}
              </DescriptionListDescription>
            </DescriptionListGroup>

            <DescriptionListGroup>
              <DescriptionListTerm>Sbd devices</DescriptionListTerm>
              <DescriptionListDescription>
                {filledSbdDevices.length === 0 ? (
                  <>No sbd devices configured</>
                ) : (
                  filledSbdDevices.map((a, i) => <div key={i}>{a}</div>)
                )}
              </DescriptionListDescription>
            </DescriptionListGroup>
          </>
        )}
      </DescriptionList>
    </TaskLibStep>
  );
};
