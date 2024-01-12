import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const ContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;
`;

export const InnerBox = styled.div`
  max-width: 27%;
  width: 100%;
  height: 25rem;
  max-height: 27rem;
  border: 1px solid #0000005e;
  border-radius: 0.35rem;
  padding: 2rem;
`;

export const FormCol = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconUpload = styled(CloudUploadIcon)`
  height: 50px !important;
  width: 76px !important;
  margin-right: 20px;
`;

export const UploadHead = styled.div`
  font-weight: bold;
`;

export const SubmitButton = styled.div`
  height: 25px;
  width: 119px;
  margin-top: 40px;
`;

export const SelectYear = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
`;

export const HeadingLine = styled.h2`
  text-align: center;
`;

export const InnerDiv = styled.div`
  margin-top: 1rem;
`;
