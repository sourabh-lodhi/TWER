import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { TextContainer, Heading } from './TotalLeave.Styles';
import { BasicTable, Loader } from '../../components';
import {
  totalLeaveColumns,
  totalLeaveStatusMenu,
  routes,
  dateHandler,
  date,
  earlyGoing,
  dateTimeCalculation,
  dateWithTime,
} from '../../utils';
import { getMyLeaves, getTotalLeaves } from '../../services';
import { FilterBar } from '../../container';

export const TotalLeave = ({ isCheck }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allLeaves, allMyLeaves, loading } = useSelector(
    (state) => state?.leaves
  );
  const leaves = isCheck ? allLeaves?.allLeaves : allMyLeaves;

  const [data, setdata] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  const debouncingFunction = (func, delay) => {
    let timeOutId;
    return (...args) => {
      if (timeOutId) clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        return func.call(this, ...args);
      }, delay);
    };
  };

  const onSearchText = (query) => {
    const payloadData = {
      search: query ? query : search,
      status: status,
      fromDate: fromDate ? moment(fromDate).format('L').toString() : null,
      endDate: endDate ? moment(endDate).format('L').toString() : null,
    };
    if (query || fromDate || status || endDate) {
      dispatch(getTotalLeaves(payloadData));
      dispatch(getMyLeaves(payloadData));
    } else {
      dispatch(getTotalLeaves({}));
      dispatch(getMyLeaves({}));
    }
  };

  const handleInputChange = debouncingFunction(onSearchText, 2000);

  useEffect(() => {
    onSearchText();
    // eslint-disable-next-line
  }, [fromDate, endDate, status]);

  useEffect(() => {
    setdata(leaves);
  }, [leaves]);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const convertOptions = totalLeaveStatusMenu?.map((e) => {
    return { label: e.name, value: e.value };
  });

  const convertTimeAsPerTimeZone = (item, type) => {
    const fromTime =
      type === earlyGoing
        ? dateHandler({
            value: item?.fromTime,
            formateType: date,
          })
        : dateHandler({
            value: item?.fromDate,
            formateType: date,
          });
    const toTime =
      type === earlyGoing
        ? dateHandler({
            value: encodeURI?.toTime,
            formateType: date,
          })
        : dateHandler({
            value: item?.toDate,
            formateType: date,
          });
    return { fromTime, toTime };
  };

  const totalLeave = data?.map((item) => {
    const fullName = item?.users?.fullName;
    const email = item?.users?.email;
    const type = item?.type;
    const { fromTime, toTime } = convertTimeAsPerTimeZone(item, type);
    const getTotalDiff = () => {
      return {
        from: type === earlyGoing ? item?.fromTime : item?.fromDate,
        to: type === earlyGoing ? item?.toTime : item?.toDate,
      };
    };
    const totalTimeDiff = dateTimeCalculation(
      type,
      getTotalDiff().from,
      getTotalDiff().to
    );
    const applyTime = dateHandler({
      value: item?.createdAt,
      formateType: dateWithTime,
    });
    const status = item?.status;
    return [
      fullName,
      email,
      type,
      fromTime,
      toTime,
      totalTimeDiff,
      applyTime,
      status,
    ];
  });

  const handleNavigation = (index) => {
    navigate(`${routes.leave.leaveDetailsId}${data[index]?._id}`);
  };

  const clearAllFilter = () => {
    setFromDate('');
    setEndDate('');
    setStatus('');
    setSearch('');
    dispatch(getTotalLeaves({}));
    dispatch(getMyLeaves({}));
  };

  const handleShowLoading = () => {
    return (
      <Loader
        style={{
          width: '100% !important',
          height: 'calc(100vh - 80px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  };

  const showTotalLeavesData = () => {
    return (
      <>
        <FilterBar
          fromDate={fromDate}
          setFromDate={setFromDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isCheck={isCheck}
          status={status}
          handleChangeStatus={handleChangeStatus}
          handlechange={handleInputChange}
          options={convertOptions}
          setSearch={setSearch}
          clearFilter={clearAllFilter}
          query={search}
        />
        {data ? (
          <BasicTable
            columns={totalLeaveColumns}
            rows={totalLeave}
            handleNavigate={handleNavigation}
          />
        ) : (
          <TextContainer>
            <Heading>No Data found</Heading>
          </TextContainer>
        )}
      </>
    );
  };

  return <>{loading ? handleShowLoading() : showTotalLeavesData()}</>;
};
