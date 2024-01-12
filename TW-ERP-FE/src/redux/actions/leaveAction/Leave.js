export const TOTAL_LEAVES = (leaveDetails) => {
  return {
    type: leaveDetails.type,
    payload: leaveDetails.payload,
  };
};

export const SINGLE_LEAVE_DATA = (leaveData) => {
  return {
    type: leaveData.type,
    payload: leaveData.payload,
  };
};

export const SET_EMPTY_LEAVE_DATA_ACTION = (emptyData) => {
  return {
    type: emptyData.type,
    payload: emptyData.payload,
  };
};

export const GET_MY_LEAVE_ACTION = (myLeaveData) => {
  return {
    type: myLeaveData.type,
    payload: myLeaveData.payload,
  };
};

export const GET_CC_ACTION = (ccDetails) => {
  return {
    type: ccDetails.type,
    payload: ccDetails.payload,
  };
};

export const APPLY_LEAVE_ACTION = (applyData) => {
  return {
    type: applyData.type,
    payload: applyData.payload,
  };
};

export const UPDATE_LEAVE_ACTION = (leaveDetail) => {
  return {
    type: leaveDetail.type,
    payload: leaveDetail.payload,
  };
};

export const RESET_APPLY_LEAVE_STATE_ACTION = (resetData) => {
  return {
    type: resetData.type,
    payload: resetData.payload,
  };
};

export const COMMENT_LISTING = (commentData) => {
  return {
    type: commentData.type,
    payload: commentData.payload,
  };
};

export const UPLOAD_SHEET = (sheetData) => {
  return {
    type: sheetData.type,
    payload: sheetData.payload,
  };
};


export const CURRENT_LEAVES_TAB = (currentTab) => {
  return {
    type: currentTab.type,
    payload: currentTab.payload,
  };
};