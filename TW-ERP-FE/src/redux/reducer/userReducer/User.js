import * as T from "../../types";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.GENERATE_CHANGE_SALARY_PASS_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };

    case T.GENERATE_CHANGE_SALARY_PASS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };

    case T.GENERATE_CHANGE_SALARY_PASS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    case T.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };

    case T.CHANGE_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };

    case T.CHANGE_PASSWORD_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
      case T.UPDATE_ACCOUNT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          errorMessage: "",
        };
  
      case T.UPDATE_ACCOUNT_DETAILS_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          errorMessage: "",
        };
  
      case T.UPDATE_ACCOUNT_DETAILS_REQUEST_FAIL:
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: payload,
        };
  

    default:
      return state;
  }
};
