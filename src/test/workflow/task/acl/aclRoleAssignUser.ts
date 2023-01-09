import {prepareCommonTaskSimple} from "test/workflow/task/utils";
import {select} from "test/workflow/form";

const commonTask = prepareCommonTaskSimple({
  taskKey: "task-acl-role-assign-user",
  openKey: "task acl-role-assign-user",
});

const {inView} = commonTask;

const selectors = {
  userName: inView("subject-name"),
};

const task = {
  ...commonTask,
  selectUser: async (userName: string) => {
    await select(selectors.userName, userName);
  },
};
export {task};
