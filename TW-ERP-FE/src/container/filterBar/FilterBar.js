import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { useLocation, useNavigate } from 'react-router-dom';

import { Wrapper, InputField } from './FilterBar.styles';
import {
  BackButtonMain,
  Button,
  ClearFilterButton,
  DatePickers,
  SelectFeild,
} from '../../components';

export const FilterBar = ({
  endDate,
  fromDate,
  setEndDate,
  setFromDate,
  handlechange,
  isCheck,
  setSearch,
  status,
  handleChangeStatus,
  clearFilter,
  options,
  query,
}) => {
  const history = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    history(-1);
  };

  const handleInputChange = (event) => {
    handlechange(event);
    setSearch(event);
  };

  return (
    <Wrapper>
      <div className="main-container">
        <BackButtonMain>
          <Button
            color="info"
            text="Back"
            leftIcon={<ArrowBackIcon />}
            handleOnClick={handleBack}
          />
        </BackButtonMain>
        <div className="filter-container">
          <div className="search-bar-container">
            <SearchIcon className="search-bar" />
            {location.pathname === '/total-leave' ? null : (
              <InputField
                className="input-field"
                type="search"
                name="search"
                placeholder="Search by name or email"
                onChange={(e) => handleInputChange(e.target.value)}
                value={query}
              />
            )}
          </div>
          <div className="date-container">
            <div>
              From:
              <DatePickers startDate={fromDate} setStartDate={setFromDate} />
            </div>
            <div>
              To:
              <DatePickers
                startDate={endDate}
                setStartDate={setEndDate}
                date={fromDate}
              />
            </div>
          </div>
          {isCheck && (
            <div className="select-container">
              <SelectFeild
                selectField="select-field"
                cssprop={'true'}
                selectedValue={status}
                label="status"
                handleChange={handleChangeStatus}
                options={options}
              />
            </div>
          )}
          <ClearFilterButton marginTop="7px">
            <Button
              color="info"
              text="Clear"
              height="30px"
              rightIcon={<TuneIcon />}
              handleOnClick={clearFilter}
            />
          </ClearFilterButton>
        </div>
      </div>
    </Wrapper>
  );
};
