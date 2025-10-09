import React from "react";
import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList} from "app/view/share";

import {useTask} from "./useTask";
import {Stack, StackItem, Text, TextContent} from "@patternfly/react-core";

const {review} = testMarks.task.propertiesUpdate;

export const Review = () => {
  const {propertyMap, clusterPropertiesDefinition} = useTask();
  const propertyNameMap = React.useMemo(
    () =>
      clusterPropertiesDefinition.reduce(
        (nameMap, property) => ({
          ...nameMap,
          [property.name]: property.readable_name,
        }),
        {} as Record<string, string>,
      ),
    [clusterPropertiesDefinition],
  );
  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">Review cluster properties changes</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <ReviewList>
          {Object.entries(propertyMap).map(([name, value]) => (
            <span key={name} {...review.property.mark}>
              <ReviewItem
                label={
                  <span {...review.property.name.mark}>
                    {propertyNameMap[name]}
                  </span>
                }
                value={value}
                {...review.property.value.mark}
              />
            </span>
          ))}
        </ReviewList>
      </StackItem>
    </Stack>
  );
};
