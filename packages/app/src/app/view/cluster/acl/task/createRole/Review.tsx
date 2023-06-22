import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

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
        <ReviewItem label="Role name" value={roleId} />
        <ReviewItem label="Role description" value={description} />
        <ReviewItem
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
