import { MenuList } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 1.7rem !important;
  border-radius: 0.35rem !important;
  border-color: #959595 !important;
  line-height: 22px !important;
  margin-bottom: 2rem;
`;
export const ListItems = styled(MenuList)`
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  align-items: baseline;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
