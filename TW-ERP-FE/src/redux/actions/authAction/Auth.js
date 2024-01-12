export const LOGIN_ACTION = (loginDetails) => {
  return {
    type: loginDetails.type,
    payload: loginDetails.payload,
  };
};

export const CREATE_USER_ACTION = (userDetails) => {
  return {
    type: userDetails.type,
    payload: userDetails.payload,
  };
};

export const GET_USER_ACTION = (userDetails) => {
  return {
    type: userDetails.type,
    payload: userDetails.payload,
  };
};

export const LOG_OUT = (details) => {
  return {
    type: details.type,
    payload: details.payload,
  };
};

export const GET_USER_ROLE = (roleDetails) => {
  return {
    type: roleDetails.type,
    payload: roleDetails.payload,
  };
};

export const SET_TOKEN = (token) => {
  return {
    type: token.type,
    payload: token.payload,
  };
};
