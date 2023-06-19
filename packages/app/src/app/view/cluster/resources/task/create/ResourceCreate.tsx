import {
  TaskFinishLibWizard,
  TaskResultAction,
  TaskSuccess,
  Wizard,
  WizardFooter,
} from "app/view/share";

import {Review} from "./Review";
import {useTask} from "./useTask";
import {NameType} from "./NameType";
import {InstanceAttrsForm} from "./InstanceAttrsForm";
import {Settings} from "./Settings";

export const ResourceCreate = () => {
  const {
    close,
    clusterName,
    create,
    isNameTypeValid,
    isAgentLoaded,
    areInstanceAttrsValid,
    areSettingsValid,
    state: {
      resourceName,
      libCall: {reports, response},
    },
  } = useTask();
  const title = `create resource "${resourceName}"`;
  return (
    <Wizard
      clusterName={clusterName}
      task="resourceCreate"
      data-test="task-resource-create"
      onClose={close}
      title="New resource"
      description="Create new resource"
      steps={[
        {
          name: "Name and type",
          component: <NameType />,
          footer: (
            <WizardFooter
              next={{
                actionIf: isNameTypeValid,
              }}
              backDisabled
            />
          ),
        },
        {
          name: "Instance attributes",
          component: <InstanceAttrsForm />,
          footer: (
            <WizardFooter
              next={{
                actionIf: areInstanceAttrsValid,
                disabled: !isAgentLoaded,
              }}
            />
          ),
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Settings",
          component: <Settings />,
          footer: <WizardFooter next={{actionIf: areSettingsValid}} />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => create({force: false}),
                label: "Create resource",
              }}
            />
          ),
          canJumpTo:
            isNameTypeValid && areInstanceAttrsValid && areSettingsValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName={title}
              success={
                <TaskSuccess
                  taskName={title}
                  primaryAction={<TaskResultAction />}
                />
              }
              backToUpdateSettingsStepName="Name and type"
              proceedForce={() => create({force: true})}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
