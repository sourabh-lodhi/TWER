export const details = [
  {
    name: 'fullName',
    autoComplete: 'fullName',
    id: 'fullName',
    label: 'Full Name',
  },
  {
    name: 'email',
    autoComplete: 'email',
    id: 'email',
    label: 'Email Address',
  },
  {
    name: 'password',
    autoComplete: 'new-password',
    id: 'password',
    label: 'Password',
    type: 'password',
  },
];

export const showselect = [
  {
    value: 'developer',
    name: 'Developer',
  },
  {
    value: 'teamlead',
    name: 'Team Lead',
  },
  {
    value: '62eb7af857d775316269b36f',
    name: 'HR/Managment',
  },
];

export const emailRegex = /[a-zA-Z0-9]@thoughtwin.com/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
