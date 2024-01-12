import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import {
  leaveRequestColumns,
  approved,
  dateTimeCalculation,
  earlyGoing,
  pending,
  rejected,
  dateHandler,
  dateWithTime,
  date,
  label,
  routes,
  Approved,
  Unapprroved,
} from '../../utils'
import { getTotalLeaves, updateLeaveAction, updateLeaveData } from '../../services'
import { FilterBar } from '../../container'
import {
  Container,
  StyleMain,
  StyleText,
  AcceptIconMUI,
  CancelIconMUI,
} from './LeaveRequest.Styles'
import { NavigateTab, BasicTable, Modal, Loader } from '../../components'
import { UnapprovedPopup } from './UnapprovedPopup'
import { toast } from 'react-toastify'

export const LeaveRequest = () => {
  let { allLeaves, loading } = useSelector(
    (state) => state?.leaves,
  )
  const { _id} = useSelector(
    (state) => state?.auth?.userDetails
  );

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fromDate, setFromDate] = useState('')
  const [search, setSearch] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('')
  const [comment, setComment] = useState('')
  const [id, setId] = useState(false)



  const debouncingFunction = (func, delay) => {
    let timeOutId
    return (...args) => {
      if (timeOutId) clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        return func.call(this, ...args)
      }, delay)
    }
  }
  const onSearchText = (query) => {
    const payloadData = {
      search: query ? query : search,
      status: status,
      fromDate: fromDate ? moment(fromDate).format('L').toString() : null,
      endDate: endDate ? moment(endDate).format('L').toString() : null,
    }
    if (query || fromDate || endDate) {
      dispatch(getTotalLeaves(payloadData))
    } else {
      dispatch(getTotalLeaves({}))
    }
  }

  const handleInputChange = debouncingFunction(onSearchText, 1000)

  useEffect(() => {
    onSearchText()
    // eslint-disable-next-line
  }, [endDate, fromDate, status])

  const validateDate = (date) => {
    // let fromDate = moment(date).format('l')
    //  !moment(fromDate).isSameOrAfter(moment().day(-7).format('l'), 'day')

    return false
  }

  const handleChange = (id, status, fromDate) => {
    if (validateDate(fromDate)) {
      return toast.error("Past date leaves can't be approve or reject")
    } else {
      dispatch(
        updateLeaveAction({
          query: {
            id: id,
            status,
            comment: comment,
          },
        }),
      )
    }
  }

  const handlePropogation = (e) => {
    e.stopPropagation()
  }

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
          })
    const toTime =
      type === earlyGoing
        ? dateHandler({
            value: encodeURI?.toTime,
            formateType: date,
          })
        : dateHandler({
            value: item?.toDate,
            formateType: date,
          })
    return { fromTime, toTime }
  }
  const actionButton = (row, type) => {
    if (type === pending) {
      return (
        <div
          sx={{ display: 'flex', border: 'none' }}
          onClick={handlePropogation}
        >
          <AcceptIconMUI
            onClick={() => handleChange(row?._id, approved, row?.fromDate)}
          />
          <CancelIconMUI
            onClick={() =>
              validateDate(row?.fromDate)
                ? toast.error("Past date leaves can't be approve or reject")
                : setId(row?._id)
            }
          />
        </div>
      )
    } else {
      return (
        <div align="left" sx={{ border: 'none' }} onClick={handlePropogation}>
          <Button
            variant="contained"
            color={type === rejected ? 'success' : 'error'}
            onClick={() =>
              type === rejected
                ? handleChange(row?._id, approved, row?.fromDate)
                : validateDate(row?.fromDate)
                ? toast.error("Past date leaves can't be approve or reject")
                : setId(row?._id)
            }
            sx={{ width: '90px', textTransform: 'capitalize' }}
          >
            {type === rejected ? Approved : Unapprroved}
          </Button>
        </div>
      )
    }
  }

  const renderLeaveRequest = (status) => {
    let arr = {...allLeaves}
    allLeaves?.[pending]?.forEach((item, index)=>{
      if(item?.approvedBy?.includes(_id)){
        item.status = approved;
        let approveLeave = [...arr?.[approved]];
        approveLeave = [...approveLeave, item]
        arr = {...allLeaves, approved: approveLeave}
        arr?.[pending].splice(index, 1);
        dispatch(updateLeaveData(arr))
      }
     })

     return allLeaves?.[status]?.map((item) => {
      const fullName = item?.users?.fullName
      const email = item?.users?.email
      const type = item?.type
      const { fromTime, toTime } = convertTimeAsPerTimeZone(item, type)
      const getTotalDiff = () => {
        return {
          from: type === earlyGoing ? item?.fromTime : item?.fromDate,
          to: type === earlyGoing ? item?.toTime : item?.toDate,
        }
      }
      const totalTimeDiff = dateTimeCalculation(
        type,
        getTotalDiff().from,
        getTotalDiff().to,
      )
      const applyTime = dateHandler({
        value: item?.createdAt,
        formateType: dateWithTime,
      })
      return [
        fullName,
        email,
        type,
        fromTime,
        toTime,
        totalTimeDiff,
        applyTime,
        actionButton(item, status),
      ]
    })
  }
  
  const handleNavigation = (index, leaveStatus) => {
    navigate(
      `${routes.leave.leaveDetailsId}${allLeaves[leaveStatus][index]?._id}`,
    )
  }

  const tabsData = [
    {
      label: `${label[0]} (${allLeaves?.pending?.length})`,
      data: (
        <BasicTable
          columns={leaveRequestColumns}
          rows={renderLeaveRequest(pending,_id)}
          handleNavigate={(e) => handleNavigation(e, pending)}
        />
      ),
    },
    {
      label: `${label[1]} (${allLeaves?.approved?.length})`,
      data: (
        <BasicTable
          columns={leaveRequestColumns}
          rows={renderLeaveRequest(approved)}
          handleNavigate={(e) => handleNavigation(e, approved)}
        />
      ),
    },
    {
      label: `${label[2]} (${allLeaves?.rejected?.length})`,
      data: (
        <BasicTable
          columns={leaveRequestColumns}
          rows={renderLeaveRequest(rejected)}
          handleNavigate={(e) => handleNavigation(e, rejected)}
        />
      ),
    },
  ]
  const handleClose = () => {
    setId(false)
  }
  const handleSubmit = (e) => {
    handleChange(id, rejected)
    setId(false)
    setComment('')
  }

  const clearAllFilter = () => {
    setSearch('')
    setFromDate('')
    setEndDate('')
    setStatus('')
    dispatch(getTotalLeaves({}))
  }

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
    )
  }

  const showLeaveRequestData = () => {
    return (
      <>
        <Modal open={id} handleClose={handleClose}>
          <UnapprovedPopup
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            setComment={setComment}
            comment={comment}
          />
        </Modal>
        <Container>
          <FilterBar
            endDate={endDate}
            fromDate={fromDate}
            setEndDate={setEndDate}
            setFromDate={setFromDate}
            handlechange={handleInputChange}
            setSearch={setSearch}
            clearFilter={clearAllFilter}
            query={search}
          />
          {tabsData ? (
            <NavigateTab data={tabsData} />
          ) : (
            <StyleMain>
              <StyleText>No Data found</StyleText>
            </StyleMain>
          )}
        </Container>
      </>
    )
  }

  return <>{loading ? handleShowLoading() : showLeaveRequestData()}</>
}
