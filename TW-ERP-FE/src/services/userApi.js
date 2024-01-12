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
import { getUserApi } from './authApi';

export const generateOrChangeSalaryPassword = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.GENERATE_OR_CHANGE_SALARY_PASSWORD({
          type: T.GENERATE_CHANGE_SALARY_PASS_REQUEST,
        })
      );
      const response = await request({
        url: API.userApi.generateOrChangeSalaryPassword,
        method: post,
        data: body,
      });
      dispatch(
        T.GENERATE_OR_CHANGE_SALARY_PASSWORD({
          type: T.GENERATE_CHANGE_SALARY_PASS_SUCCESS,
          payload: response,
        })
      );
      toastMessage({
        type: success,
        message: response?.message
          ? response?.message
          : Message?.success?.GENERATE_SALARY_PASSWORD_SUCCESS,
      });
      dispatch(getUserApi());
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.GENERATE_SALARY_PASSWORD_ERROR,
      });
      dispatch(
        T.GENERATE_OR_CHANGE_SALARY_PASSWORD({
          type: T.GENERATE_CHANGE_SALARY_PASS_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};

export const changePassword = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.CHANGE_PASSWORD({
          type: T.CHANGE_PASSWORD_REQUEST,
        })
      );
      const response = await request({
        url: API.userApi.changePassword,
        method: put,
        data: body,
      });
      dispatch(
        T.CHANGE_PASSWORD({
          type: T.CHANGE_PASSWORD_REQUEST_SUCCESS,
          payload: response,
        })
      );
      toastMessage({
        type: success,
        message: response?.message
          ? response?.message
          : Message?.success?.CHANGE_PASSWORD_SUCCESS,
      });
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.CHANGE_PASSWORD_ERROR,
      });
      dispatch(
        T.CHANGE_PASSWORD({
          type: T.CHANGE_PASSWORD_REQUEST_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};
export const updateAcountDetail = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.UPDATE_ACOUNT_DETAILS({
          type: T.UPDATE_ACCOUNT_DETAILS_REQUEST,
        })
      );
      const response = await request({
        url: API.userApi.updateAcountDetail,
        method: put,
        data: body,
      });
      dispatch(
        T.UPDATE_ACOUNT_DETAILS({
          type: T.UPDATE_ACCOUNT_DETAILS_REQUEST_SUCCESS,
          payload: response,
        })
      );
      toastMessage({
        type: success,
        message: response?.success
          ? response?.success
          : Message?.success?.UPDATE_ACCOUNT_DETAILS_SUCCESS,
      });
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.SOMETHING_WENT_WRONG,
      });
      dispatch(
        T.UPDATE_ACOUNT_DETAILS({
          type: T.UPDATE_ACCOUNT_DETAILS_REQUEST_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};