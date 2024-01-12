import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { TabContainer, TabMainContainer } from './NavitagtionTab.Styles'
import { useDispatch, useSelector } from 'react-redux'
import { currentLeavesTab } from '../../services/leaveApi'

export const NavigateTab = (props) => {
  let dispatch=useDispatch()
  const { data } = props  
  let {currentTab}=useSelector((state)=>state?.leaves)

  const handleChange = (event, newValue) => {
    dispatch(currentLeavesTab(newValue))
  }
  return (
    <div>
      <TabContext value={currentTab && currentTab}>
        <TabMainContainer>
          <TabList onChange={handleChange}>
            {data?.map((item, index) => (<TabContainer label={item.label} value={String(index + 1)} key={index} />))}
          </TabList>
        </TabMainContainer>
        {data?.map((item, index) => (
          <TabPanel value={String(index + 1)} key={index}>{item.data}</TabPanel>
        ))}
      </TabContext>
    </div>
  )
}
