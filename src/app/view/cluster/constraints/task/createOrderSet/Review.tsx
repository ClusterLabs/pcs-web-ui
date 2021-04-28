import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Review: React.FC = () => {
  const {
    state: { id, kind, symmetrical, reports, sets },
  } = useTask();

  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>Id</DescriptionListTerm>
          <DescriptionListDescription>
            {id.length > 0 ? (
              id
            ) : (
              <div style={{ fontStyle: "italic" }}>
                Not set; will be generated
              </div>
            )}
          </DescriptionListDescription>
        </DescriptionListGroup>

        <DescriptionListGroup>
          <DescriptionListTerm>Kind</DescriptionListTerm>
          <DescriptionListDescription>{kind}</DescriptionListDescription>
        </DescriptionListGroup>

        <DescriptionListGroup>
          <DescriptionListTerm>Symmetrical</DescriptionListTerm>
          <DescriptionListDescription>
            {symmetrical ? "yes" : "no"}
          </DescriptionListDescription>
        </DescriptionListGroup>

        {sets.map((set, i) => (
          <DescriptionListGroup key={i}>
            <DescriptionListTerm>Resource set {i + 1}</DescriptionListTerm>
            <DescriptionListDescription>
              <DescriptionList isHorizontal>
                <DescriptionListGroup>
                  <DescriptionListTerm>Resources</DescriptionListTerm>
                  <DescriptionListDescription>
                    {set.resources.join(", ")}
                  </DescriptionListDescription>
                </DescriptionListGroup>

                <DescriptionListGroup>
                  <DescriptionListTerm>Action</DescriptionListTerm>
                  <DescriptionListDescription>
                    {set.action}
                  </DescriptionListDescription>
                </DescriptionListGroup>

                <DescriptionListGroup>
                  <DescriptionListTerm>Sequential</DescriptionListTerm>
                  <DescriptionListDescription>
                    {set.sequential ? "yes" : "no"}
                  </DescriptionListDescription>
                </DescriptionListGroup>

                <DescriptionListGroup>
                  <DescriptionListTerm>Require all</DescriptionListTerm>
                  <DescriptionListDescription>
                    {set.requireAll ? "yes" : "no"}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              </DescriptionList>
            </DescriptionListDescription>
          </DescriptionListGroup>
        ))}
      </DescriptionList>
    </TaskLibStep>
  );
};
