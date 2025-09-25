import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList} from "app/view/share";

import {useTask} from "./useTask";
import {Stack, StackItem, Text, TextContent} from "@patternfly/react-core";

const {review} = testMarks.task.propertiesUpdate;

export const Review = () => {
  const {propertyMap} = useTask();
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
            <ReviewItem
              key={name}
              label={name}
              value={value}
              {...review.property.mark}
            />
          ))}
        </ReviewList>
      </StackItem>
    </Stack>
  );
};
