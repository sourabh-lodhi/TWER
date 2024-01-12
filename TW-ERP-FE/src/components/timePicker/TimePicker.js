import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as BasicTimePicker } from '@mui/x-date-pickers/TimePicker';

import { MainPicker } from './TimePicker.styles';

export const TimePicker = ({ value, handleChange, label, disabled }) => {
  const handleInput = (newValue) => {
    handleChange(newValue);
  };
  return (
    <MainPicker>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BasicTimePicker
          value={value}
          disabled={disabled}
          ampm={false}
          onChange={handleInput}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </MainPicker>
  );
};
