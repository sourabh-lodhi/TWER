import * as T from '../../types';

const initialLeavesState = {
  allLeaves: [],
  allMyLeaves: [],
  loading: false,
  error: false,
  errorMessage: '',
  leaveDetail: {},
  commentList: [],
  unapprovedResult: {},
  csvSheet: '',
  currentTab : '1'
};

export const leavesReducer = (state = initialLeavesState, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.GET_ALL_LEAVES_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case T.GET_ALL_LEAVES_SUCCESS:
      return {
        ...state,
        allLeaves: { ...payload },
        loading: false,
      };
    case T.GET_ALL_LEAVES_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        loading: false,
      };

    case T.LEAVE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case T.LEAVE_DETAIL_SUCESS:
      return {
        ...state,
        loading: false,
        error: false,
        leaveDetail: payload,
      };
    case T.LEAVE_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case T.LEAVE_DETAIL_EMPTY:
      return {
        ...state,
        leaveDetail: {},
      };
    case T.GET_MY_LEAVES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case T.GET_MY_LEAVES_SUCCESS:
      return {
        ...state,
        allMyLeaves: payload,
        loading: false,
      };
    case T.GET_MY_LEAVES_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        loading: false,
      };
    case T.SHOW_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case T.SHOW_COMMENT_SUCCESS:
      return {
        ...state,
        commentList: payload,
        loading: false,
      };
    case T.SHOW_COMMENT_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        loading: false,
      };
    case T.UPLOAD_TIMESHEET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case T.UPLOAD_TIMESHEET_SUCCESS:
      return {
        ...state,
        csvSheet: payload,
        loading: false,
      };
    case T.UPLOAD_TIMESHEET_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        loading: false,
      };
    case T.UPDATE_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case T.UPDATE_LEAVE_SUCESS:
      return {
        ...state,
        unapprovedResult: payload,
        loading: false,
      };
    case T.UPDATE_LEAVE_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        loading: false,
      };
      case T.CURRENT_TAB:
        return {
          ...state,
          currentTab:payload
        };
    default:
      return state;
  }
};
