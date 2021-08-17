import React from "react";

import { ReviewList, ReviewValue, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";
import { ReviewLink } from "./ReviewLink";

export const Review: React.FC = () => {
  const {
    state: {
      nodeNameList,
      clusterName,
      linkList,
      quorumOptions,
      libCall: { reports },
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue label="Cluster name" value={clusterName} />
        <ReviewValue
          label="Node addresses"
          value={nodeNameList.map((nodeName, i) => (
            <div key={i}>{nodeName}</div>
          ))}
        />
        <ReviewValue
          label="Knet links"
          value={
            <ReviewList>
              {linkList.map(link => (
                <ReviewValue
                  label={`Link ${link.linknumber}`}
                  key={link.linknumber}
                  value={
                    <ReviewList>
                      <ReviewValue
                        label="Addresses"
                        value={
                          <ReviewList>
                            {Object.entries(link.addresses).map(
                              ([nodeName, address]) => (
                                <ReviewValue
                                  key={nodeName}
                                  label={nodeName}
                                  value={address}
                                />
                              ),
                            )}
                          </ReviewList>
                        }
                      />
                      <ReviewLink link={link} field="mcastport" label="Port" />
                      <ReviewLink
                        link={link}
                        field="ping_interval"
                        label="Ping interval"
                      />
                      <ReviewLink
                        link={link}
                        field="ping_interval"
                        label="Ping interval"
                      />
                      <ReviewLink
                        link={link}
                        field="ping_precision"
                        label="Ping precision"
                      />
                      <ReviewLink
                        link={link}
                        field="ping_timeout"
                        label="Ping timeout"
                      />
                      <ReviewLink
                        link={link}
                        field="pong_count"
                        label="Pong count"
                      />
                      <ReviewLink
                        link={link}
                        field="transport"
                        label="Transport"
                      />
                    </ReviewList>
                  }
                />
              ))}
            </ReviewList>
          }
        />
        <ReviewValue
          label="Quorum options"
          value={
            <ReviewList>
              <ReviewValue
                label="Auto tie breaker"
                value={quorumOptions.autoTieBreaker}
              />
              <ReviewValue
                label="Last man standing"
                value={quorumOptions.lastManStanding}
              />
              <ReviewValue
                label="Last man standing window"
                value={quorumOptions.lastManStandingWindow}
              />
              <ReviewValue
                label="Wait for all"
                value={quorumOptions.waitForAll}
              />
            </ReviewList>
          }
        />
      </ReviewList>
    </TaskLibStep>
  );
};
