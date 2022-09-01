import { all } from "redux-saga/effects";

/* eslint-disable import/max-dependencies */
import { fork, takeEvery } from "./common";
import * as clusterImport from "./clusterImport";
import * as cluster from "./cluster";
import * as clusterDestroy from "./clusterDestroy";
import * as clusterRemove from "./clusterRemove";
import * as dashboard from "./dashboard";
import * as dataLoad from "./common/dataLoad";
import * as login from "./login";
import * as notifications from "./common/notifications";
import * as resourceUpdate from "./resourceUpdate";
import * as fenceDeviceUpdate from "./fenceDeviceUpdate";
import * as resourceAgent from "./resourceAgent";
import * as fenceAgent from "./fenceAgent";
import * as username from "./username";
import * as clusterProperties from "./clusterProperties";
import * as clusterPermissions from "./clusterPermissions";
import * as resourceAgentList from "./resourceAgentList";
import * as fenceAgentList from "./fenceAgentList";
import * as resourceRefreshCleanup from "./resourceRefreshCleanup";
import * as resourceDelete from "./resourceDelete";
import * as libAction from "./libAction";
import * as libCallTask from "./libCallTask";
import * as nodeStartStop from "./nodeStartStop";
import * as nodeAdd from "./nodeAdd";
import * as clusterSetup from "./clusterSetup";
import * as permissionsSave from "./permissionsSave";
import * as resourceClone from "./resourceClone";
import * as nvpairSave from "./nvpairSave";
import * as nodeAuth from "./nodeAuth";
import * as fixAuth from "./fixAuth";
import * as resourceGroupCreate from "./resourceGroupCreate";
import * as resourceGroupChange from "./resourceGroupChange";
import * as constraints from "./constraints";
import * as clusterStart from "./clusterStart";

function* rootSaga() {
  yield all([
    fork(dataLoad.setUpDataReading),
    fork(dataLoad.manage, dashboard.clusterListSyncOptions),
    fork(dataLoad.manage, cluster.clusterDataSyncOptions),
    takeEvery("USERNAME.LOAD", username.usernameLoad),
    takeEvery("AUTH.SUCCESS", username.checkLogin),
    takeEvery("LOGIN.LOGOUT", login.logoutSaga),
    takeEvery("LOGIN.ENTER_CREDENTIALS", login.loginSaga),
    takeEvery("NOTIFICATION.CREATE", notifications.limitNotificationLife),
    takeEvery("LIB.CALL.CLUSTER", libAction.callLib),
    takeEvery("LIB.CALL.CLUSTER.TASK", libCallTask.callLib),
    takeEvery("CLUSTER.PROPERTIES.LOAD", clusterProperties.load),
    takeEvery("CLUSTER.PERMISSIONS.LOAD", clusterPermissions.load),
    takeEvery("CLUSTER.PERMISSIONS.SAVE", permissionsSave.permissionsSave),
    takeEvery("CLUSTER.PROPERTIES.UPDATE", clusterProperties.update),
    takeEvery("CLUSTER.NVPAIRS.SAVE", nvpairSave.nvpairSave),
    takeEvery("DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH", clusterImport.checkAuth),
    takeEvery(
      "DASHBOARD.CLUSTER.IMPORT.RUN",
      clusterImport.importExistingCluster,
    ),
    takeEvery("CLUSTER.FIX_AUTH.START", fixAuth.fixAuth),
    takeEvery("CLUSTER.FIX_AUTH.AUTH_DONE", fixAuth.fixAuthDistribute),
    takeEvery(
      "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD",
      clusterSetup.checkCanAddNodeSaga,
    ),
    takeEvery("DASHBOARD.CLUSTER.SETUP.CHECK_AUTH", clusterSetup.checkAuthSaga),
    takeEvery(
      "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS",
      clusterSetup.sendKnownHostsToNodeSaga,
    ),
    takeEvery("DASHBOARD.CLUSTER.SETUP.CALL", clusterSetup.setup),
    takeEvery("CONSTRAINT.SINGLE.CREATE", constraints.create),
    takeEvery("CONSTRAINT.DELETE", constraints.deleteConstraint),
    takeEvery("CONSTRAINT.DELETE.RULE", constraints.deleteConstraintRule),
    takeEvery("DASHBOARD.CLUSTER.START", clusterStart.clusterStartSaga),
    takeEvery("DASHBOARD.CLUSTER.REMOVE", clusterRemove.clusterRemove),
    takeEvery("DASHBOARD.CLUSTER.DESTROY", clusterDestroy.clusterDestroy),
    takeEvery("NODE.START", nodeStartStop.nodeStart),
    takeEvery("NODE.STOP", nodeStartStop.nodeStop),
    takeEvery("NODE.ADD.CHECK_CAN_ADD", nodeAdd.checkCanAddNodeSaga),
    takeEvery("NODE.ADD.CHECK_AUTH", nodeAdd.checkAuthSaga),
    takeEvery("NODE.ADD.SEND_KNOWN_HOSTS", nodeAdd.sendKnownHostsSaga),
    takeEvery("NODE.AUTH", nodeAuth.nodeAuthSaga),
    takeEvery("FENCE_AGENT.LOAD", fenceAgent.load),
    takeEvery("FENCE_AGENT.ENSURE", fenceAgent.ensure),
    takeEvery("FENCE_AGENT.LIST.LOAD", fenceAgentList.load),
    takeEvery("RESOURCE_AGENT.LOAD", resourceAgent.load),
    takeEvery("RESOURCE_AGENT.ENSURE", resourceAgent.ensure),
    takeEvery("RESOURCE_AGENT.LIST.LOAD", resourceAgentList.load),
    takeEvery("RESOURCE.DELETE", resourceDelete.deleteResource),
    takeEvery("RESOURCE.REFRESH", resourceRefreshCleanup.refreshSaga),
    takeEvery("RESOURCE.CLEANUP", resourceRefreshCleanup.cleanupSaga),
    takeEvery("RESOURCE.CLONE", resourceClone.clone),
    takeEvery("RESOURCE.UNCLONE", resourceClone.unclone),
    takeEvery("RESOURCE.GROUP.CREATE", resourceGroupCreate.create),
    takeEvery("RESOURCE.GROUP.CHANGE", resourceGroupChange.change),
    takeEvery(
      "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES",
      resourceUpdate.updateInstanceAttributes,
    ),
    takeEvery("FENCE_DEVICE.EDIT_ARGS.RUN", fenceDeviceUpdate.updateArguments),
  ]);
}

export { rootSaga };
