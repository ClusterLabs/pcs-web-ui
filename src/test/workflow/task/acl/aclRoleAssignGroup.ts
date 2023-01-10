import {prepareCommonTaskSimple} from "test/workflow/task/utils";
import {select} from "test/workflow/form";
import {getDropdownMenu} from "test/components";

const commonTask = prepareCommonTaskSimple({
  taskKey: "task-acl-role-assign-group",
  openKey: "task acl-role-assign-group",
});

const {inView, waitForOpen} = commonTask;

const selectors = {
  groupName: inView("subject-name"),
};

const task = {
  ...commonTask,
  open: async () => {
    const menu = getDropdownMenu("detail-card");
    await menu.launchItem("acl-role-assign-group");
    await waitForOpen();
  },
  selectGroup: async (groupName: string) => {
    await select(selectors.groupName, groupName);
  },
};
export {task};
