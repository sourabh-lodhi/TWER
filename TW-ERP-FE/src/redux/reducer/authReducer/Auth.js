import { setLocalData } from '../../../utils';
import * as T from '../../types';

const initialState = {
  userDetails: {},
  loading: false,
  error: false,
  errorMessage: {},
  userLoginData: {},
  roles: [],
  token: '',
};

export const authReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case T.USER_LOGIN_SUCCESS:
      setLocalData('token', payload.accessToken);
      return {
        ...state,
        userLoginData: payload,
        loading: false,
        token: payload.accessToken,
      };

    case T.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };

    case T.SET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case T.SET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        token: payload,
      };

    case T.SET_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };

    case T.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case T.CREATE_USER_SUCCESS:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
        loading: false,
        error: false,
        success: true,
        errorMessage: '',
      };
    case T.CREATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        errorMessage: payload,
      };
    case T.USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case T.USER_LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        error: false,
        userDetails: {},
        userLoginData: {},
        token: '',
      };
    case T.USER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case T.REMOVE_USER:
      localStorage.removeItem('token');
      return {
        userDetails: {},
        userLoginData: {},
      };
    case T.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case T.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userDetails: payload.data,
      };
    case T.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    /***************User Role in signup page*******************/
    case T.GET_USER_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case T.GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        roles: payload,
        loading: false,
      };
    case T.GET_USER_ROLE_FAIL:
      return {
        loading: true,
        error: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
