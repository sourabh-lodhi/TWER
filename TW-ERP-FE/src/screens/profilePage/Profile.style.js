import styled from 'styled-components';

export const ProfileStyle = styled.div`
  margin-top: 80px;
  border: 2px soild black;
  padding-right: 73px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  justify-content: center !important ;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;

  height: 260px;
  font-size: 20px;

  align-items: flex-start;
`;

export const InnerField = styled.div`
  justify-content: center !important;
  flex-direction: column;
  column-gap: 40px;
  margin-bottom: 30px;
  font-weight: bold;
  margin-top: 10px;
`;

export const EntirePage = styled.div`
  background-color: gray;
  display: flex;
  align-items: center;
  background-color: rgb(187 183 183);
  width: 100%;
  height: 100%;
`;

export const MainHeading = styled.h1`
  text-align: center;
  width: 100%;
`;

export const ImageContainer = styled.img`
  border-radius: 50%;
  margin-bottom: 34px;
  margin-left: 35px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  width: 20%;
  margin-right: 10px;
`;

export const TitleContainer = styled.span`
  text-decoration: underLine;
  margin-left: 10px;
`;
