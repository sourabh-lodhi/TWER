export const GENERATE_OR_CHANGE_SALARY_PASSWORD = (
  generateOrChangeSalaryPassword
) => {
  return {
    type: generateOrChangeSalaryPassword.type,
    payload: generateOrChangeSalaryPassword.payload,
  };
};

export const CHANGE_PASSWORD = (changePassword) => {
  return {
    type: changePassword.type,
    payload: changePassword.payload,
  };
};
export const UPDATE_ACOUNT_DETAILS = (updateAccountDetails) => {
  return {
    type: updateAccountDetails.type,
    payload: updateAccountDetails.payload,
  };
};
