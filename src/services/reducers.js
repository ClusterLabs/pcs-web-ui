import {combineReducers} from "redux";
import login from "../scenes/login/reducer"
import dashboard from "../scenes/dashboard/reducer"
import cluster from "./cluster/reducer"
import clusterProperties from "../scenes/cluster-properties/reducer"

const reducer = combineReducers({
  dashboard,
  login,
  cluster,
  clusterProperties,
})

export default reducer;
