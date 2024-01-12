import { combineReducers } from "redux";

import { authReducers } from "./authReducer";
import { leavesReducer, applyLeaveReducer } from "./leaveReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  auth: authReducers,
  leaves: leavesReducer,
  applyLeave: applyLeaveReducer,
  user: userReducer,
});
