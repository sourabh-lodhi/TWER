import {
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

export const loginApi = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.LOGIN_ACTION({
          type: T.USER_LOGIN_REQUEST,
        })
      );
      const response = await request({
        url: API.authApi.signIn,
        method: post,
        data: body,
      });
      dispatch(
        T.LOGIN_ACTION({
          type: T.USER_LOGIN_SUCCESS,
          payload: response,
        })
      );
      toastMessage({
        type: success,
        message: response?.message
          ? response?.message
          : Message?.success?.LOGIN_SUCCESS,
      });
      dispatch(getUserApi());
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.USER_LOGIN_ERROR,
      });
      dispatch(
        T.LOGIN_ACTION({
          type: T.USER_LOGIN_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};

export const logOutApi = () => {
  return async (dispatch) => {
    try {
      dispatch(
        T.LOG_OUT({
          type: T.USER_LOGOUT_REQUEST,
        })
      );

      const response = await request({
        url: API.authApi.signOut,
        method: put,
      });

      dispatch(
        T.LOG_OUT({
          type: T.USER_LOGOUT_SUCCESS,
        })
      );
      toastMessage({
        type: success,
        message: response?.message
          ? response?.message
          : Message.success.LOGOUT_SUCCESS,
      });
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.USER_LOGOUT_ERROR,
      });

      dispatch(
        T.LOG_OUT({
          type: T.USER_LOGOUT_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};

export const getUserApi = () => {
  return async (dispatch) => {
    try {
      dispatch(
        T.GET_USER_ACTION({
          type: T.GET_USER_REQUEST,
        })
      );
      const userData = await request({
        url: API.authApi.getUser,
      });
      dispatch(
        T.GET_USER_ACTION({
          type: T.GET_USER_SUCCESS,
          payload: userData,
        })
      );
    } catch (err) {
      dispatch(
        T.GET_USER_ACTION({
          type: T.GET_USER_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};

export const getUserRole = () => {
  return async (dispatch) => {
    try {
      dispatch(
        T.GET_USER_ROLE({
          type: T.GET_USER_ROLE_REQUEST,
        })
      );
      const { roles } = await request({
        url: API.authApi.getUserRoles,
      });
      dispatch(
        T.GET_USER_ROLE({
          type: T.GET_USER_ROLE_SUCCESS,
          payload: roles,
        })
      );
    } catch (err) {
      dispatch(
        T.GET_USER_ROLE({
          type: T.GET_USER_ROLE_FAIL,
          payload: err.message,
        })
      );
    }
  };
};

export const createUserApi = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.CREATE_USER_ACTION({
          type: T.CREATE_USER_REQUEST,
        })
      );
      const response = await request({
        url: API.authApi.signUp,
        method: post,
        data: body,
      });
      dispatch(
        T.CREATE_USER_ACTION({
          type: T.CREATE_USER_SUCCESS,
          payload: response,
        })
      );
      toastMessage({
        type: success,
        message: response?.message
          ? response?.message
          : Message.success.REGISTER_SUCCESS,
      });
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.USER_REGISTER_ERROR,
      });
      dispatch(
        T.CREATE_USER_ACTION({
          type: T.CREATE_USER_FAIL,
          payload: err?.response?.data?.error,
        })
      );
      return false;
    }
  };
};

export const setToken = (token) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.SET_TOKEN({
          type: T.SET_TOKEN_REQUEST,
        })
      );
      dispatch(
        T.SET_TOKEN({
          type: T.SET_TOKEN_SUCCESS,
          payload: token,
        })
      );
    } catch (err) {
      dispatch(
        T.SET_TOKEN({
          type: T.SET_TOKEN_FAIL,
          payload: err.message,
        })
      );
    }
  };
};
