import clusterBreadcrumbs from "./json/clusterBreadcrumbs.json";
import clusterTabs from "./json/clusterTabs.json";
import dashboard from "./json/dashboard.json";
import dashboardToolbar from "./json/dashboardToolbar.json";
import header from "./json/header.json";
import login from "./json/login.json";
import notifications from "./json/notifications.json";
import aclAssignSubjectToRole from "./json/task/aclAssignSubjectToRole.json";
import aclRoleAddPermission from "./json/task/aclRoleAddPermission.json";
import aclRoleCreate from "./json/task/aclRoleCreate.json";
import clusterImportExisting from "./json/task/clusterImportExisting.json";
import clusterSetup from "./json/task/clusterSetup.json";
import clusterStop from "./json/task/clusterStop.json";
import confirm from "./json/task/confirm.json";
import constraintColocationCreate from "./json/task/constraintColocationCreate.json";
import constraintLocationCreate from "./json/task/constraintLocationCreate.json";
import constraintOrderCreate from "./json/task/constraintOrderCreate.json";
import constraintTicketCreate from "./json/task/constraintTicketCreate.json";
import fenceDeviceArgumentsEdit from "./json/task/fenceDeviceArgumentsEdit.json";
import fenceDeviceCreate from "./json/task/fenceDeviceCreate.json";
import nodeAdd from "./json/task/nodeAdd.json";
import nodeStop from "./json/task/nodeStop.json";
import nvsetEdit from "./json/task/nvsetEdit.json";
import permissionEdit from "./json/task/permissionEdit.json";
import resourceCreate from "./json/task/resourceCreate.json";
import resourceMove from "./json/task/resourceMove.json";
import resourcePrimitiveGroupChange from "./json/task/resourcePrimitiveGroupChange.json";
import sbdConfigure from "./json/task/sbdConfigure.json";
import sbdDisable from "./json/task/sbdDisable.json";
import acl from "./json/cluster/acl.json";
import aclToolbar from "./json/cluster/aclToolbar.json";
import constraints from "./json/cluster/constraints.json";
import constraintsToolbar from "./json/cluster/constraintsToolbar.json";
import fenceDevices from "./json/cluster/fenceDevices.json";
import fenceDevicesToolbar from "./json/cluster/fenceDevicesToolbar.json";
import forbiden from "./json/cluster/forbiden.json";
import loading from "./json/cluster/loading.json";
import nodes from "./json/cluster/nodes.json";
import nodesToolbar from "./json/cluster/nodesToolbar.json";
import overview from "./json/cluster/overview.json";
import overviewToolbar from "./json/cluster/overviewToolbar.json";
import permissions from "./json/cluster/permissions.json";
import permissionsToolbar from "./json/cluster/permissionsToolbar.json";
import properties from "./json/cluster/properties.json";
import resources from "./json/cluster/resources.json";
import resourcesToolbar from "./json/cluster/resourcesToolbar.json";
import sbd from "./json/cluster/sbd.json";
import sbdToolbar from "./json/cluster/sbdToolbar.json";

// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
//
// Don't use names:
// - mark
// - locator
// - path
// The structure is enhanced by this keys (here or in tests)
export const structure = {
  header,
  notifications,
  login,
  dashboardToolbar,
  dashboard,
  clusterBreadcrumbs,
  clusterTabs,
  cluster: {
    forbiden,
    loading,
    overview,
    overviewToolbar,
    nodes,
    nodesToolbar,
    resources,
    resourcesToolbar,
    fenceDevices,
    fenceDevicesToolbar,
    sbd,
    sbdToolbar,
    constraints,
    constraintsToolbar,
    properties,
    acl,
    aclToolbar,
    permissions,
    permissionsToolbar,
  },
  task: {
    aclAssignSubjectToRole,
    aclRoleAddPermission,
    aclRoleCreate,
    clusterImportExisting,
    clusterSetup,
    clusterStop,
    constraintColocationCreate,
    constraintLocationCreate,
    constraintOrderCreate,
    constraintTicketCreate,
    fenceDeviceArgumentsEdit,
    fenceDeviceCreate,
    nodeAdd,
    nodeStop,
    nvsetEdit,
    permissionEdit,
    resourceCreate,
    resourceMove,
    resourcePrimitiveGroupChange,
    sbdDisable,
    sbdConfigure,
    confirm,
  },
};
