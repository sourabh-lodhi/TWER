import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ContainerBox,
  SubmitButton,
  SelectYear,
  InnerBox,
  FormCol,
  HeadingLine,
  InnerDiv,
} from './uploadTimeSheet.style';
import { Button, Input, SelectFeild } from '../../components';
import {
  csvPassword,
  Message,
  monthsName,
  toastMessage,
  yearCalculation,
} from '../../utils';
import { uploadCSVAction } from '../../services';

export const UploadTimeSheet = () => {
  const [sheet, setSheet] = useState({
    isError: false,
    fileData: null,
    inputKey: '',
    month: '',
    year: '',
    salary_password: {
      value: '',
      errorMessage: '',
    },
    password: {
      value: '',
      errorMessage: '',
    },
  });

  const { loading } = useSelector((state) => state?.leaves);

  const dispatch = useDispatch();

  const resetTheFileInput = () => {
    const randomString = Math.random().toString(36);
    setSheet({
      ...sheet,
      isError: false,
      fileData: null,
      month: '',
      year: '',
      salary_password: {
        value: '',
        errorMessage: '',
      },
      password: {
        value: '',
        errorMessage: '',
      },
      inputKey: randomString,
    });
  };
  const yearData = yearCalculation();
  const yearList = yearData.map((year) => ({ value: year, label: year }));

  const fileChangeHandler = (e) => {
    setSheet({ ...sheet, fileData: e.target.files[0] });
  };

  const monthOption = monthsName.map((e) => {
    return { label: e.name, value: e.value };
  });

  const salaryPasswordChange = (e) => {
    let value = e.target.value;
    setSheet({
      ...sheet,
      salary_password: {
        value: value,
        errorMessage: csvPassword(value),
      },
    });
  };

  const passwordChange = (e) => {
    let targetValue = e.target.value;
    setSheet({
      ...sheet,
      password: {
        value: targetValue,
        errorMessage: csvPassword(targetValue),
      },
    });
  };

  const handleChange = (e) => {
    setSheet({ ...sheet, month: e.target.value });
  };

  const handleYear = (e) => {
    setSheet({ ...sheet, year: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !sheet.fileData ||
      !sheet.month ||
      !sheet.year ||
      !sheet.password ||
      !sheet.salary_password
    ) {
      setSheet({ ...sheet, isError: true });
      toastMessage({
        type: 'error',
        message: Message.errors.FILE_UPLOAD_ERROR,
      });
      return false;
    }
    const data = new FormData();
    data.append('timesheet', sheet.fileData);
    data.append('salary_password', sheet.salary_password.value);
    data.append('password', sheet.password.value);

    const params = { month: sheet.month, year: sheet.year };

    dispatch(uploadCSVAction({ body: data, params }));
    resetTheFileInput();
  };

  return (
    <ContainerBox>
      <InnerBox>
        <HeadingLine>Upload Sheet</HeadingLine>
        <FormCol>
          <div>
            <input
              type="file"
              key={sheet.inputKey || ''}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={fileChangeHandler}
            />
            <InnerDiv>
              <>
                <div>Select Month</div>
                <SelectFeild
                  options={monthOption}
                  selectedValue={sheet.month || ''}
                  handleChange={(e) => handleChange(e)}
                />
              </>
              <SelectYear>
                <label htmlFor="select-year">Select Year</label>
                <SelectFeild
                  options={yearList}
                  selectedValue={sheet.year || ''}
                  handleChange={(e) => handleYear(e)}
                  id={'select-year'}
                />
              </SelectYear>
              <Input
                label="Salary Password"
                value={sheet?.salary_password.value}
                onChange={salaryPasswordChange}
                type="password"
                autoComplete="on"
                errorMessage={sheet?.salary_password?.errorMessage}
              />

              <Input
                label="Password"
                value={sheet?.password.value}
                onChange={passwordChange}
                type="password"
                autoComplete="on"
                errorMessage={sheet?.password?.errorMessage}
              />
            </InnerDiv>

            <SubmitButton>
              <Button
                color="info"
                text="Submit"
                handleOnClick={onSubmitHandler}
                isLoading={loading}
              />
            </SubmitButton>
          </div>
        </FormCol>
      </InnerBox>
    </ContainerBox>
  );
};
