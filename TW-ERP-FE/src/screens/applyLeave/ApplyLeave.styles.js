import styled from 'styled-components';

export const Container = styled.div`
  margin: 25px;
`;
export const MailContainer = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid;
`;

export const MailHeading = styled.div`
  height: 20px;
  padding: 10px;
  color: white;
  background-color: black;
  border-radius: 9px 9px 0px 0px;
`;

export const MailContainerBody = styled.div`
  padding: 15px 10px;
`;
export const BodyButton = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

export const TimePickerContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  flex-direction: ${(props) => props.from && 'column'};

  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
    height: 33px;
  }
  .head-text {
    margin: 0px, 0px, 8px, 0px !important;
  }
`;

export const TimeParagreaph = styled.p`
  margin: 0px 0px 8px 0px;
`;

export const ApplyLeaveUpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ApplyLeaveUpperStatus = styled.div`
  text-transform: capitalize;
`;
export const LeaveContainer = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  gap: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SelectContainer = styled.div`
  width: 150px;
  border: 1px solid grey;
  border-radius: 5px;
  border-color: #959595;
  height: 1.8rem;

  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    outline: none;
    border: none;
  }
  & .select-container .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon {
    top: 0px;
  }
  &
    .select-container
    .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    padding: 5px;
    padding-left: 15px;
  }
`;

export const ButtonBar = styled.div`
  width: 100%;
`;

export const CommentContainer = styled.div`
  background-color: white;
  max-width: 700px;
  max-height: calc(100vh - 100px);
  border-radius: 10px;
  overflow: auto;
  min-height: 300px;
  min-width: 600px;
`;
