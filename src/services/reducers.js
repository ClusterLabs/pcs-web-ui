import {combineReducers} from "redux";
import login from "../scenes/login/reducer"
import dashboard from "../scenes/dashboard/reducer"
import cluster from "../scenes/cluster-overview/reducer"

const reducer = combineReducers({
  dashboard,
  login,
  cluster,
})

export default reducer;
