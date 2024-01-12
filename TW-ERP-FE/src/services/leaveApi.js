import {
  all,
  API,
  error,
  Message,
  post,
  put,
  request,
  success,
  toastMessage,
} from '../utils';
import * as T from '../redux';

export const getTotalLeaves = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.TOTAL_LEAVES({
          type: T.GET_ALL_LEAVES_REQUEST,
        })
      );
      const { leaves } = await request({
        url: API.leavesApi.totalLeave,
        params: {
          search: body.search,
          status: body.status === all ? '' : body.status,
          startDate: body.fromDate,
          endDate: body.endDate,
        },
      });
      dispatch(
        T.TOTAL_LEAVES({
          type: T.GET_ALL_LEAVES_SUCCESS,
          payload: leaves,
        })
      );
    } catch (err) {
      dispatch(
        T.TOTAL_LEAVES({
          type: T.GET_ALL_LEAVES_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};

export const getSingleLeaveData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: T.LEAVE_DETAIL_REQUEST });
      const { leave } = await request({
        url: `${API.leavesApi.totalLeave}${id}`,
      });

      dispatch({
        type: T.LEAVE_DETAIL_SUCESS,
        payload: leave,
      });
    } catch (err) {
      dispatch({
        type: T.LEAVE_DETAIL_FAIL,
        payload: err?.response?.data?.error,
      });
    }
  };
};

export const getCCAction = () => {
  return async (dispatch) => {
    try {
      dispatch(
        T.GET_CC_ACTION({
          type: T.GET_CC_REQUEST,
        })
      );
      const getCCData = await request({
        url: API.leavesApi.getCc,
      });
      dispatch(
        T.GET_CC_ACTION({
          type: T.GET_CC_SUCCESS,
          payload: getCCData,
        })
      );
    } catch (err) {
      dispatch(
        T.GET_CC_ACTION({
          type: T.GET_CC_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};

export const applyLeaveAction = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.APPLY_LEAVE_ACTION({
          type: T.APPLY_LEAVE_REQUEST,
        })
      );
      const applyLeaveData = await request({
        url: API.leavesApi.applyLeave,
        method: post,
        data: body,
      });
      dispatch(
        T.APPLY_LEAVE_ACTION({
          type: T.APPLY_LEAVE_SUCCESS,
          payload: applyLeaveData,
        })
      );
      toastMessage({ type: success, message: Message.success.LEAVE_APPLIED });
    } catch (err) {
      dispatch(
        T.APPLY_LEAVE_ACTION({
          type: T.APPLY_LEAVE_FAIL,
          payload: err?.response?.data?.error,
        })
      );
      toastMessage({ type: error, message: err?.response?.data?.error });
    }
  };
};

export const resetApplyLeaveState = () => {
  return (dispatch) => {
    dispatch(
      T.RESET_APPLY_LEAVE_STATE_ACTION({ type: T.RESET_APPLY_LEAVE_STATE })
    );
  };
};

export const setEmptyLeaveData = () => {
  return (dispatch) => {
    dispatch({ type: T.LEAVE_DETAIL_EMPTY });
  };
};

export const getMyLeaves = (body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: T.GET_MY_LEAVES_REQUEST,
      });
      const { leaves } = await request({
        url: API.leavesApi.myLeave,
        params: {
          search: body.search,
          status: body.status === all ? '' : body.status,
          startDate: body.fromDate,
          endDate: body.endDate,
        },
      });
      dispatch({
        type: T.GET_MY_LEAVES_SUCCESS,
        payload: leaves,
      });
    } catch (err) {
      dispatch({
        type: T.GET_MY_LEAVES_FAIL,
        payload: err?.response?.data?.error,
      });
    }
  };
};

export const updateLeaveAction = (params) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: T.UPDATE_LEAVE_REQUEST,
      });
      const updateLeaveData = await request({
        url: `${API.leavesApi.leaveRequest}/${params.query.id}`,
        method: put,
        data:
          params.query.status === 'approved'
            ? {
                status: params.query.status,
              }
            : {
                comment: params.query.comment,
                status: params.query.status,
              },
      });

      dispatch({
        type: T.UPDATE_LEAVE_SUCESS,
        payload: updateLeaveData,
      });
      toastMessage({
        type: success,
        message: updateLeaveData?.message
          ? updateLeaveData?.message
          : Message?.success?.message,
      });
      dispatch(getTotalLeaves({}));
    } catch (err) {
      dispatch({
        type: T.UPDATE_LEAVE_FAIL,
        payload: err?.response?.data?.error,
      });
     
      toastMessage({
        type: error,
        message: err?.response?.data?.error 
          ? err?.response?.data?.error
          : err?.response?.data?.message || Message.errors.OLD_UNAPPROVED_DATE ,
      });
    }
  };
};

export const getComment = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: T.SHOW_COMMENT_REQUEST,
      });
      const result = await request({
        url: `${API.leavesApi.getComment}?id=${id}`,
      });
      dispatch({
        type: T.SHOW_COMMENT_SUCCESS,
        payload: result,
      });
    } catch (err) {
      dispatch({
        type: T.SHOW_COMMENT_FAIL,
        payload: err?.response?.data?.error,
      });
    }
  };
};

export const uploadCSVAction = ({ body, params }) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.UPLOAD_SHEET({
          type: T.UPLOAD_TIMESHEET_REQUEST,
        })
      );
      const sheetData = await request({
        url: `${API.timesheetApi.upload}`,
        method: post,
        params,
        data: body,
      });

      dispatch(
        T.UPLOAD_SHEET({
          type: T.UPLOAD_TIMESHEET_SUCCESS,
          payload: sheetData,
        })
      );
      toastMessage({
        type: success,
        message: Message?.success?.UPLOAD_SUCCESS,
      });
    } catch (err) {
      dispatch(
        T.UPLOAD_SHEET({
          type: T.UPLOAD_TIMESHEET_FAIL,
          payload: err?.response?.data?.error,
        })
      );
      toastMessage({ type: error, message: err?.response?.data?.error });
    }
  };
};


export const currentLeavesTab = (currentValue) => {
  return async (dispatch) => {

      dispatch(
        T.CURRENT_LEAVES_TAB({
          type: T.CURRENT_TAB,
          payload: currentValue,
        })
      );
     

  };
};

export const updateLeaveData = (leaves) => {
  return async (dispatch) => {
    dispatch(
      T.TOTAL_LEAVES({
        type: T.GET_ALL_LEAVES_SUCCESS,
        payload: leaves,
      })
    );
  }
}
