import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tile } from '../../components';
import { Container } from './DashBoard.styles';
import { dashboardRoutes } from '../../utils';
import {  Modal } from "../../components";

import { AccountDetailsPopUp } from '../profilePage/AccountDetailsPopUp';

export const DashBoard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const role = useSelector(
    (state) => state?.auth?.userDetails?.role
  );
  const userAccount = useSelector(
    (state) => state?.auth?.userDetails?.user_account
  );
  const data = dashboardRoutes?.filter((obj) =>
    obj.canAccess.find((canAccess) =>role === canAccess)
  );
  const handlePopUpOpen = () => {
    setOpenPopUp(true);
  };

  const handlePopUpClose = () => {
    setOpenPopUp(false );
  };
  useEffect(() => {
    if(userAccount) {
      if(!userAccount?.aadhar_no || !userAccount?.pan_no){
        handlePopUpOpen()
      }
    }
  }, [userAccount])

  return (<>
         {openPopUp &&(
        <Modal
          open={openPopUp}
          handleClose={() => handlePopUpClose()}
        >
          <AccountDetailsPopUp
            handleClose={() => handlePopUpClose()}
            userAccount={userAccount}
          />
        </Modal>
      )}

    <Container>
      {data?.map((e, i) => (
        <Tile name={e?.name} path={e?.path} key={i} />
      ))}
    </Container>
    </>
  );
};
