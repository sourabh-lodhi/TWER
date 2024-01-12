import { routes } from './routes';
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CreateIcon from '@mui/icons-material/Create';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export const ondeDay = 'oneday';
export const other = 'other';
export const fullDay = 'fullDay';
export const firstHalf = 'firstHalf';
export const secondHalf = 'secondHalf';
export const wfhFullDay = 'wfhFullDay';
export const wfhFirstHalf = 'wfhFirstHalf';
export const wfhSecondHalf = 'wfhSecondHalf';
export const extraFullDay = 'extraFullDay';
export const extraFirstHalf = 'extraFirstHalf';
export const extraSecondHalf = 'extraSecondHalf';
export const earlyGoing = 'earlyGoing';
export const fromTime = 'fromTime';
export const toTime = 'toTime';
export const fromDate = 'fromDate';
export const toDate = 'toDate';
export const description = 'description';
export const leave = 'leave';
export const firstHalfFrom = '10:00 am';
export const firstHalfTo = '02:00 pm';
export const secondHalfFrom = '03:00 pm';
export const secondHalfTo = '07:00 pm';
export const post = 'post';
export const put = 'put';
export const all = 'all';
export const pending = 'pending';
export const approved = 'approved';
export const Approved = 'Approved';
export const Unapprroved = 'Unapproved';
export const rejected = 'rejected';
export const allPending = ' Pending leaves';
export const allRejected = 'Rejected leaves';
export const allApproved = 'Approved leaves';
export const success = 'success';
export const error = 'error';
export const date = 'DD/MM/YYYY';
export const dateWithTime = 'DD/MM/YYYY, h:mm A';
export const label = [allPending, allApproved, allRejected];

export const applyLeaveRadioButtonArray = [
  {
    value: 'oneday',
    label: 'One Day',
  },
  {
    value: 'other',
    label: 'Other',
  },
];
export const dashboardRoutes = [
  {
    name: 'View Leave Requests',
    path: routes.leave.leaveRequest,
    canAccess: [1, 2, 3],
    icon: <PreviewIcon />,
  },
  {
    name: 'Apply Leave',
    path: routes.leave.applyLeave,
    canAccess: [1, 2, 3, 4],
    icon: <SendIcon />,
  },
  {
    name: ' My Total Leaves',
    path: routes.leave.totalLeave,
    canAccess: [1, 2, 3, 4],
    icon: <AllInboxIcon />,
  },
  {
    name: 'View All Employees Leaves',
    path: routes.leave.checkLeave,
    canAccess: [1, 2],
    icon: <PreviewIcon />,
  },
  {
    name: 'Create New Account',
    path: routes.auth.createNewUser,
    canAccess: [1],
    icon: <CreateIcon />,
  },
  {
    name: 'Upload Time Sheet',
    path: routes.leave.timeSheet,
    canAccess: [1],
    icon: <DriveFolderUploadIcon />,
  },
];
export const drawerRoutes = dashboardRoutes;

export const leaveRequestStatusMenu = [
  {
    name: 'pending',
    value: 'pending',
  },
  {
    name: 'rejected',
    value: 'rejected',
  },
  {
    name: 'approved',
    value: 'approved',
  },
];

export const leaveRequestColumns = [
  { id: 'S.No', headerName: 'S.No', width: 130 },
  { id: 'name', headerName: 'Name', width: 200 },
  { id: 'Email', headerName: 'Email', width: 200 },
  { id: 'type', headerName: 'Type', width: 200 },
  { id: 'from', headerName: 'From', width: 200 },
  { id: 'to', headerName: 'To', width: 200 },
  { id: 'total', headerName: 'Total', width: 200 },
  { id: 'applied', headerName: 'Applied on', width: 200 },
  { id: 'approval', headerName: 'Action', width: 200 },
];

export const commentColumnList = [
  { id: 'S.No', headerName: 'S.No', width: 10 },
  { id: 'Date', headerName: 'Date', width: 10 },
  { id: 'Name', headerName: 'Name', width: 10 },
  { id: 'Status', headerName: 'Status', width: 100 },
  { id: 'Comment', headerName: 'Comment', width: 100 },
];

export const applyLeaveSelect = [
  {
    value: 'fullDay',
    name: 'Full Day',
    _id: 'fullDay',
  },
  {
    value: 'firstHalf',
    name: '1st Half',
    _id: 'firstHalf',
  },
  {
    value: 'secondHalf',
    name: '2nd Half',
    _id: 'secondHalf',
  },
  {
    value: 'earlyGoing',
    name: 'Early Going',
    _id: 'earlyGoing',
  },
  {
    value: 'wfhFullDay',
    name: 'WFH Full Day',
    _id: 'wfhFullDay',
  },
  {
    value: 'wfhFirstHalf',
    name: 'WFH 1st Half',
    _id: 'wfhFirstHalf',
  },
  {
    value: 'wfhSecondHalf',
    name: 'WFH 2nd Half',
    _id: 'wfhSecondHalf',
  },
  {
    value: 'extraFullDay',
    name: 'Extra Full Day',
    _id: 'extraFullDay',
  },
  {
    value: 'extraFirstHalf',
    name: 'Extra 1st Half',
    _id: 'extraFirstHalf',
  },

  {
    value: 'extraSecondHalf',
    name: 'Extra 2nd Half',
    _id: 'extraSecondHalf',
  },
];

export const monthsName = [
  {
    value: 'January',
    name: 'January',
  },
  {
    value: 'feburary',
    name: 'February',
  },
  {
    value: 'march',
    name: 'March',
  },
  {
    value: 'april',
    name: 'April',
  },
  {
    value: 'may',
    name: ' May',
  },
  {
    value: 'june',
    name: 'June',
  },
  {
    value: 'july',
    name: 'July',
  },
  {
    value: 'august',
    name: 'August',
  },
  {
    value: 'september',
    name: ' September',
  },
  {
    value: 'october',
    name: 'October',
  },
  {
    value: 'november',
    name: 'November',
  },
  {
    value: 'december',
    name: 'December',
  },
];

export const totalLeaveColumns = [
  { id: 'S.No', headerName: 'S.No', width: 130 },
  { id: 'name', headerName: 'Name', width: 200 },
  { id: 'email', headerName: 'Email', width: 200 },
  { id: 'type', headerName: 'Type', width: 100 },
  { id: 'from', headerName: 'From', width: 130 },
  { id: 'to', headerName: 'To', width: 130 },
  { id: 'total', headerName: 'Total', width: 100 },
  { id: 'applied', headerName: 'Applied on', width: 130 },
  { id: 'status', headerName: 'Status', width: 130 },
];

export const totalLeaveStatusMenu = [
  {
    name: 'pending',
    value: 'pending',
    _id: 'pending',
  },
  {
    name: 'rejected',
    value: 'rejected',
    _id: 'rejected',
  },
  {
    name: 'approved',
    value: 'approved',
    _id: 'approved',
  },
  {
    name: 'all',
    value: 'all',
    _id: 'all',
  },
];
