import {ReviewList, ReviewValue, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

export const Review = () => {
  const {
    state: {
      roleId,
      description,
      permissionInfoList,
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue label="Role name" value={roleId} />
        <ReviewValue label="Role description" value={description} />
        <ReviewValue
          label="Permissions"
          value={
            <ReviewList>
              {permissionInfoList.map(([kind, scopeType, scope], i) => (
                <div key={i}>{`(${scopeType}) ${scope}: ${kind}`}</div>
              ))}
            </ReviewList>
          }
        />
      </ReviewList>
    </TaskLibStep>
  );
};
