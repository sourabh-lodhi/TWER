import DatePicker from 'react-datepicker';
import styled from 'styled-components';

export const DateInput = styled(DatePicker)`
  height: 1.7rem;
  border-radius: 0.35rem;
  border: 1px solid;
  padding-left: rem;
  border-color: #959595;
  line-height: 22px;
  font-size: 15px;
  padding-left: 0.8rem;
  ::placeholder {
    font-size: 14px;
  }
  :focus-visible {
    outline: none;
  }
`;
