import * as T from "../../types";

const initialState = {
  getCCData: [],
  loading: false,
  error: false,
  errorMessage: "",
  isLeaveApllied: false,
};

export const applyLeaveReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.APPLY_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
        isLeaveApllied: false,
      };
    case T.APPLY_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        isLeaveApllied: true,
      };
    case T.APPLY_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
        isLeaveApllied: false,
      };
    case T.GET_CC_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case T.GET_CC_SUCCESS:
      return {
        ...state,
        getCCData: payload.data,
        loading: false,
      };
    case T.GET_CC_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        loading: false,
      };
    case T.RESET_APPLY_LEAVE_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
