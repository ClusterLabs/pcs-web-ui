import {combineReducers} from "redux";
import dashboard from "../scenes/dashboard/reducer"
import login from "../scenes/login/reducer"

const reducer = combineReducers({
  dashboard,
  login,
})

export default reducer;
