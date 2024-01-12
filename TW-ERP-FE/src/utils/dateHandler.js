import moment from 'moment';

export const dateHandler = ({ value, formateType }) => {
  return moment(value).format(formateType);
};
