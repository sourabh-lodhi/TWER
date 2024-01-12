import React from 'react';
import { FormControl, FormLabel } from '@mui/material';

import { DatePickers, RadioForm, TimePicker } from '../../components';
import { TimePickerContainer } from '../../screens/applyLeave/ApplyLeave.styles';
import { ShowDays } from './LeaveOption.style';

import {
  applyLeaveRadioButtonArray,
  fullDay,
  other,
  wfhFullDay,
  earlyGoing,
  toDate,
  fromTime,
  toTime,
  fromDate,
  extraFullDay,
} from '../../utils';

export const LeaveOption = ({
  applyLeaveData,
  Radio,
  setRadio,
  handleChange,
  id,
  totalTimeDiff,
}) => {
  const radioForm = () => {
    if (
      applyLeaveData.leave === fullDay ||
      applyLeaveData.leave === wfhFullDay ||
      applyLeaveData.leave === extraFullDay
    ) {
      return (
        <TimePickerContainer>
          <RadioForm
            value={Radio}
            setValue={setRadio}
            radioArray={applyLeaveRadioButtonArray}
            formLabel="Leave For"
            disabled={id}
          />
        </TimePickerContainer>
      );
    }
  };

  const showToTime = () => {
    if (
      (applyLeaveData.leave === fullDay ||
       applyLeaveData.leave === wfhFullDay||
       applyLeaveData.leave === extraFullDay) &&
      Radio === other
    ) {
      return (
        <FormControl>
          <FormLabel
            id="radio-form-erp"
            style={{ marginTop: '6px', fontSize: '14px' }}
          >
            To:
          </FormLabel>
          <div style={{ marginTop: '6px' }}>
            <DatePickers
              setStartDate={(e) => handleChange(e, toDate)}
              details={id}
              startDate={applyLeaveData.toDate}
              date={applyLeaveData.fromDate}
            />
          </div>
        </FormControl>
      );
    }
  };

  const showEarlyTime = () => {
    if (applyLeaveData.leave === earlyGoing) {
      return (
        <>
          <FormControl>
            <FormLabel
              id="radio-form-erp"
              style={{ marginTop: '6px', fontSize: '14px' }}
            >
              From:
            </FormLabel>
            <div style={{ marginTop: '6px' }}>
              <TimePicker
                value={applyLeaveData.fromTime}
                handleChange={(e) => handleChange(e, fromTime)}
                disabled={id}
                label="From"
              />
            </div>
          </FormControl>
          <FormControl>
            <FormLabel
              id="radio-form-erp"
              style={{ marginTop: '6px', fontSize: '14px' }}
            >
              To:
            </FormLabel>
            <div style={{ marginTop: '6px' }}>
              <TimePicker
                value={applyLeaveData.toTime}
                handleChange={(e) => handleChange(e, toTime)}
                disabled={id}
                label="To"
              />
            </div>
          </FormControl>
        </>
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        gap: '1rem',
      }}
    >
      {radioForm()}
      <FormControl>
        <FormLabel
          id="radio-form-erp"
          style={{ marginTop: '6px', fontSize: '14px' }}
        >
          {Radio === other ? 'From' : 'Date'}: &nbsp;
        </FormLabel>
        <div style={{ marginTop: '6px' }}>
          <DatePickers
            setStartDate={(e) => handleChange(e, fromDate)}
            details={id}
            startDate={applyLeaveData.fromDate}
            date={new Date()}
          />
        </div>
      </FormControl>

      {showToTime()}

      {showEarlyTime()}
      <div>
        {applyLeaveData.leave === earlyGoing
          ? applyLeaveData.toTime && <ShowDays>{totalTimeDiff} </ShowDays>
          : applyLeaveData.fromDate && <ShowDays>{totalTimeDiff}</ShowDays>}
      </div>
    </div>
  );
};
