import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

const {propertiesUpdate: task} = testMarks.task;

import {useTask} from "./useTask";
import {Properties} from "./Properties";
import {PropertiesFooter} from "./PropertiesFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";

const properties = "Properties";
const review = "Review";

export const PropertiesUpdate = () => {
  const {name: taskName, close, clusterName, hasChanges} = useTask();
  const taskLabel = "Edit cluster properties";
  return (
    <Wizard
      taskLabel={taskLabel}
      task={taskName}
      onClose={close}
      description={`Edit properties of cluster "${clusterName}"`}
      steps={[
        {
          name: properties,
          component: <Properties />,
          footer: <PropertiesFooter />,
        },
        {
          name: review,
          component: <Review />,
          footer: <ReviewFooter />,
          canJumpTo: hasChanges,
        },
        {
          name: "Result",
          component: <Result backStep={properties} taskLabel={taskLabel} />,
          isFinishedStep: true,
        },
      ]}
      {...task.mark}
    />
  );
};
