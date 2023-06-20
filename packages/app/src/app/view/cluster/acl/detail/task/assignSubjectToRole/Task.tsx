import {
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReportList,
  TaskResultAction,
  TaskResultActionBackCluster,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
  TaskResultActionTryAgain,
  TaskResultLib,
  TaskSimple,
  TaskSimpleFooter,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {ChooseAssignee} from "./ChooseAssignee";

export const Task = () => {
  const {
    name: taskName,
    clusterName,
    close,
    assign,
    isAssigneeValid,
    itemsOffer,
    assigneeType,
    state: {
      libCall: {response, reports},
    },
  } = useTask();

  const taskLabel = `Assign ${assigneeType}`;

  return (
    <TaskSimple
      task={taskName}
      taskLabel={taskLabel}
      data-test={`task-acl-role-assign-${assigneeType}`}
      clusterName={clusterName}
      close={close}
      footer={
        response !== "no-response" ? null : (
          <TaskSimpleFooter
            nextIf={isAssigneeValid}
            nextDisabled={itemsOffer.length === 0}
            run={assign}
            runLabel={taskLabel}
          />
        )
      }
    >
      {response === "no-response" && <ChooseAssignee />}
      {response !== "no-response" && (
        <TaskResultLib
          response={response}
          success={<TaskSuccess primaryAction={<TaskResultAction />} />}
          unsuccess={
            <TaskFinishLibUnsuccess
              reports={reports}
              back={<TaskResultActionBackCluster />}
              proceed={<TaskResultActionProceedAnyway action={assign} />}
              cancel={<TaskResultActionCancel />}
            />
          }
          communicationError={
            <TaskFinishLibCommunicationError
              tryAgain={<TaskResultActionTryAgain action={assign} />}
              cancel={<TaskResultActionCancel />}
            />
          }
          reports={<TaskLibReportList reports={reports} />}
        />
      )}
    </TaskSimple>
  );
};
