import {testMarks} from "app/view/dataTest";
import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";

const {review} = testMarks.task.aclRoleCreate;
const {permission} = review;

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
    <TaskLibStep title="Review settings" reports={reports} {...review.mark}>
      <ReviewList>
        <ReviewItem label="Role name" value={roleId} {...review.roleId.mark} />
        <ReviewItem
          label="Role description"
          value={description}
          {...review.roleDescription.mark}
        />
        <ReviewItem
          label="Permissions"
          value={
            <ReviewList>
              {permissionInfoList.map(([kind, scopeType, scope], i) => (
                <div key={i} {...permission.mark}>
                  (<span {...permission.scopeType.mark}>{scopeType}</span>){" "}
                  <span {...permission.scope.mark}>{scope}</span>:{" "}
                  <span {...permission.kind.mark}>{kind}</span>
                </div>
              ))}
            </ReviewList>
          }
        />
      </ReviewList>
    </TaskLibStep>
  );
};
