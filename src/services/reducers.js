import {combineReducers} from "redux";
import login from "../scenes/login/reducer"
import dashboard from "../scenes/dashboard/reducer"
import cluster from "./cluster/reducer"
import clusterProperties from "../scenes/cluster-properties/reducer"
import clusterNodeAdd from "../scenes/cluster-node-add/reducer"

const reducer = combineReducers({
  dashboard,
  login,
  cluster,
  clusterProperties,
  clusterNodeAdd,
})

export default reducer;
