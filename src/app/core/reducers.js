import {combineReducers} from "redux";
import login from "app/scenes/login/reducer"
import dashboard from "app/scenes/dashboard/reducer"
import cluster from "app/services/cluster/reducer"
import clusterProperties from "app/scenes/cluster-properties/reducer"
import clusterNodeAdd from "app/scenes/cluster-node-add/reducer"
import notifications from "app/scenes/notifications/reducer.js"

const reducer = combineReducers({
  dashboard,
  login,
  cluster,
  clusterProperties,
  clusterNodeAdd,
  notifications,
})

export default reducer;
