import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  ProfileDetail,
  InnerField,
  EntirePage,
  MainHeading,
  HeaderContainer,
  ImageContainer,
  ButtonContainer,
  ProfileStyle,
  TitleContainer,
} from "./Profile.style";
import { Images } from "../../assets";
import { Button, Modal } from "../../components";
import { SalaryPasswordPopUp } from "./SalaryPasswordPopUp";
import { ChangePasswordPopUp } from "./ChangePasswordPopUp";


export const ProfilePage = () => {
  const [openPopUp, setOpenPopUp] = useState({
    salaryModal: false,
    changePassModal: false,
  });

  const { fullName, user_role, email, salary_password,leavesTaken ,allocatedLeaves} = useSelector(
    (state) => state?.auth?.userDetails
  );
  

  const handlePopUpOpen = (name) => {
    setOpenPopUp({ ...openPopUp, [name]: true });
  };

  const handlePopUpClose = (name) => {
    setOpenPopUp({ ...openPopUp, [name]: false });
  };
  

  const handleShowSalaryBtn = () => {
    return (
      <>
        {!salary_password?.length && user_role?.role_slug === 1 && (
          <ButtonContainer>
            <Button
              fullWidth={false}
              text="Generate salary password"
              handleOnClick={() => handlePopUpOpen("salaryModal")}
            />
          </ButtonContainer>
        )}
      </>
    );
  };

  return (
    <>
      <HeaderContainer>
        <MainHeading>User Profile</MainHeading>
        {handleShowSalaryBtn()}
      </HeaderContainer>
      <EntirePage>
        <ProfileStyle>
          <ImageContainer src={Images.profile} alt="profile" />
        </ProfileStyle>

        <ProfileDetail>
          <InnerField>
            Full Name:{" "}
            <TitleContainer
              style={{ textDecoration: "underLine", marginLeft: "10px" }}
            >
              {fullName}
            </TitleContainer>
          </InnerField>
          <InnerField>
            Designation:{" "}
            <TitleContainer
              style={{ textDecoration: "underLine", marginLeft: "10px" }}
            >
              {user_role?.name}
            </TitleContainer>
          </InnerField>
          <InnerField>
            {" "}
            Email:
            <TitleContainer
              style={{ textDecoration: "underLine", marginLeft: "10px" }}
            >
              {email}
            </TitleContainer>{" "}
          </InnerField>
          <InnerField>
            {" "}
            Leaves Taken:
            <TitleContainer
              style={{ textDecoration: "underLine", marginLeft: "10px" }}
            >
              {leavesTaken}
            </TitleContainer>{" "}
          </InnerField>
          <InnerField>
            {" "}
            Allocated Leaves :
            <TitleContainer
              style={{ textDecoration: "underLine", marginLeft: "10px" }}
            >
              {allocatedLeaves}
            </TitleContainer>{" "}
          </InnerField>

          <Button
            text="change password"
            fullWidth={false}
            handleOnClick={() => handlePopUpOpen("changePassModal")}
          />
        </ProfileDetail>
      </EntirePage>

      {openPopUp.salaryModal && (
        <Modal
          open={openPopUp.salaryModal}
          handleClose={() => handlePopUpClose("salaryModal")}
        >
          <SalaryPasswordPopUp
            handleClose={() => handlePopUpClose("salaryModal")}
          />
        </Modal>
      )}

      {openPopUp.changePassModal && (
        <Modal
          open={openPopUp.changePassModal}
          handleClose={() => handlePopUpClose("changePassModal")}
        >
          <ChangePasswordPopUp
            handleClose={() => handlePopUpClose("changePassModal")}
          />
        </Modal>
      )}
  
    </>
  );
};
