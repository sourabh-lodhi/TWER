export const API = {
  leavesApi: {
    applyLeave: "/api/leaves/apply",
    totalLeave: "/api/leaves/",
    myLeave: "/api/leaves/myLeaves",
    leaveRequest: "/api/leaves/changeStatus",
    getCc: "/api/leaves/getCc",
    getComment: "/api/leaves/comments",
  },

  authApi: {
    signUp: "/api/users/createUser",
    signIn: "/api/auth/signin",
    getUser: "/api/auth/getUser",
    getUserRoles: "/api/roles/getRoles",
    signOut: "/api/auth/logout",
  },

  userApi: {
    generateOrChangeSalaryPassword: "/api/users/salaryPassword",
    changePassword: "/api/users/changePassword",
    updateAcountDetail: "/api/users/updateAcountDetail",
  },

  timesheetApi: {
    upload: "/api/timesheet/upload",
  },
};
