import * as E from './message';

export const checkEmail = (email) => {
  if (!email) {
    return { valid: false, errMsg: E.Message.errors.USER_EMAIL };
  } else if (email.length < 2) {
    return { valid: false, errMsg: E.Message.info.USER_EMAIL_CHAR };
  } else if (!/^[a-zA-Z0-9 ]*$/.test(email)) {
    return { valid: false, errMsg: E.Message.errors.USER_VALID_EMAIL };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const checkFullName = (fullName) => {
  if (!fullName) {
    return { valid: false, errMsg: E.Message.errors.USER_FULLNAME };
  } else if (fullName.length < 5) {
    return { valid: false, errMsg: E.Message.info.USER_VALID_FULLNAME };
  } else if (!/^[a-zA-Z ]+$/i.test(fullName.trim())) {
    return { valid: false, errMsg: E.Message.info.USER_FULLNAME_CHAR };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const checkPassword = (pass) => {
  if (!pass) {
    return { valid: false, errMsg: E.Message.errors.USER_PASSWORD };
  } else if (!/^(?=.*[0-9])[a-zA-Z0-9]{6,12}$/.test(pass)) {
    return { valid: false, errMsg: E.Message.info.USER_VALID_PASSWORD };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const checkConfirmPassword = (confirmPassword, pass) => {
  if (!confirmPassword) {
    return { valid: false, errMsg: E.Message.errors.USER_CONFIRM_PASSWORD };
  } else if (confirmPassword !== pass) {
    return {
      valid: false,
      errMsg: E.Message.errors.USER_PASSWORD_CONFORMATION,
    };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const totalLeaves = (leave) => {
  if (!leave) {
    return { valid: false, errMsg: E.Message.errors.USER_LEAVES };
  } else if (leave <= 0) {
    return { valid: false, errMsg: E.Message.info.USER_TOTAL_LEAVES };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const checkRequired = (field, fieldName) => {
  if (!field && fieldName === 'role') {
    return { valid: false, errMsg: E.Message.errors.USER_ROLE };
  } else if (!field && fieldName === 'DOB') {
    return { valid: false, errMsg: E.Message.errors.USER_DOB };
  } else if (!field && fieldName === 'joiningDate') {
    return { valid: false, errMsg: E.Message.errors.USER_JOINING_DATE };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const checkEmpCode = (empCode) => {
  if (!empCode) {
    return { valid: false, errMsg: E.Message.errors.USER_EMP };
  } else if (empCode.length > 4) {
    return { valid: false, errMsg: E.Message.info.USER_EMP_CODE };
  } else {
    return { valid: true, errMsg: '' };
  }
};

export const isTotalLeaves = (leave) => {
  if (!leave) {
    return E.Message.errors.USER_LEAVES;
  } else if (leave <= 0) {
    return E.Message.info.USER_TOTAL_LEAVES;
  } else {
    return '';
  }
};

export const isCheckEmail = (email) => {
  if (!email) {
    return E.Message.errors.USER_EMAIL;
  } else if (email.length < 2) {
    return E.Message.info.USER_EMAIL_CHAR;
  } else if (!/^[a-zA-Z0-9 ]*$/.test(email)) {
    return E.Message.errors.USER_VALID_EMAIL;
  } else {
    return '';
  }
};

export const isCheckFullName = (fullName) => {
  if (!fullName) {
    return E.Message.errors.USER_FULLNAME;
  } else if (fullName.length < 5) {
    return E.Message.info.USER_VALID_FULLNAME;
  } else if (!/^[a-zA-Z ]+$/i.test(fullName.trim())) {
    return E.Message.info.USER_FULLNAME_CHAR;
  } else {
    return '';
  }
};

export const isCheckPassword = (pass) => {
  if (!pass) {
    return E.Message.errors.USER_PASSWORD;
  } else if (pass.length < 6) {
    return E.Message.info.USER_VALID_PASSWORD;
  } else {
    return '';
  }
};

export const isCheckConfirmPassword = (confirmPassword, pass) => {
  if (!confirmPassword) {
    return E.Message.errors.USER_CONFIRM_PASSWORD;
  } else if (confirmPassword !== pass) {
    return E.Message.errors.USER_PASSWORD_CONFORMATION;
  } else {
    return '';
  }
};

export const isCheckRequired = (field, fieldName) => {
  if (!field && fieldName === 'role') {
    return E.Message.errors.USER_ROLE;
  } else if (!field && fieldName === 'DOB') {
    return E.Message.errors.USER_DOB;
  } else if (!field && fieldName === 'joiningDate') {
    return E.Message.errors.USER_JOINING_DATE;
  } else {
    return '';
  }
};

export const isCheckEmpCode = (empCode) => {
  if (!empCode) {
    return E.Message.errors.USER_EMP;
  } else if (empCode.length > 4) {
    return E.Message.info.USER_EMP_CODE;
  } else {
    return '';
  }
};

export const isCheckSalary = (salary) => {
  if (!salary) {
    return E.Message.errors.USER_SALARY;
  }
  return '';
};

export const checkSalary = (salary) => {
  if (!salary) {
    return { valid: false, errMsg: E.Message.errors.USER_SALARY };
  }
  return { valid: true, errMsg: '' };
};

export const isEmptyField = (value) => {
  if (!value) {
    return E.Message.errors.PASSWORD_CAN_NOT_EMPTY;
  }
  return '';
};

export const csvPassword = (value) => {
  if (value.length < 6) {
    return E.Message.info.CSV_PASSWORD;
  } else {
    return '';
  }
};
export const isCheckAadharNo = (value) => {
  if (!value) {
    return E.Message.errors.AADHAR_NUMBER;
  } else if (value.length < 12) {
    return E.Message.info.AADHAR_CHAR;
  } else if (!/^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/i.test(value.trim())) {
    return E.Message.info.INVALID_AADHAR
  } else {
    return '';
  }
};

export const isCheckAccountNo = (value) => {
  if (!value) {
    return E.Message.errors.ACCOUNT_NUMBER;
  } else if (value.length < 9) {
    return E.Message.info.ACCOUNT_CHAR;
  } else if (!/^[0-9]{9,18}$/i.test(value.trim())) {
    return E.Message.info.INVALID_ACCOUNT
  } else {
    return '';
  }
};

export const isCheckEsiNo = (value) => {
  if (!value) {
    return E.Message.errors.ESI_NUMBER;
  } else if (value.length < 17) {
    return E.Message.info.ESI_CHAR;
  } else if (!/^[0-9]{9,18}$/i.test(value.trim())) {
    return E.Message.info.INVALID_ESI
  } else {
    return '';
  }
};
export const isCheckPanNo = (value) => {
  if (!value) {
    return E.Message.errors.PAN_NUMBER;
  } else if (value.length < 10) {
    return E.Message.info.PAN_CHAR;
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(value.trim())) {
    return E.Message.info.INVALID_PAN
  } else {
    return '';
  }
};
export const isCheckUanNo = (value) => {
  if (!value) {
    return E.Message.errors.UAN_NUMBER;
  } else if (value.length < 12) {
    return E.Message.info.AADHAR_CHAR;
  } else if (!/^[0-9]{9,12}$/i.test(value.trim())) {
    return E.Message.info.INVALID_UAN
  } else {
    return '';
  }
};