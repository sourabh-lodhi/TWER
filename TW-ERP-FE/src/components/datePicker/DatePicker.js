import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { DateInput } from './DatePicker.styles';

export const DatePickers = ({ startDate, setStartDate, details, date }) => {
  const isDisable = details ? true : false;

  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return day !== 0;
  };

  return (
    <DateInput
      disabled={isDisable}
      selected={startDate}
      filterDate={isWeekday}
      // minDate={date}
      onChange={setStartDate}
      dateFormat="dd-MM-yyyy"
      placeholderText="dd/mm/yy"
    />
  );
};
