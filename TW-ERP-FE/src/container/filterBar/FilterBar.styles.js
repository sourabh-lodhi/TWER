import { TextField } from "@mui/material";
import styled from "styled-components";
export const Wrapper = styled.div`
   & .main-container{
    display: flex;
  justify-content: space-between;
  padding-top: 15px;
  padding-left: 25px;
  align-items: center;
   }
   & .filter-container{
    display: flex;
  align-items: center;
  margin-right: 30px;
   }
   & .search-bar-container{
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 6px;
   }
   & .date-container{
    display: flex;
   }
   & .select-container{
    width: 150px;
    border: 1px solid grey;
    border-radius: 5px;
    border-color: #959595;
    height: 1.8rem;
    margin-top: 10px;
    margin-right:15px
   }
   & .input-field{
    margin-right: 20px;
    height: 2rem;
    border-radius: 0.35rem;
    border: 1px solid;
    width: 15rem;
    padding-left: 2rem;
    border-color: #959595;
    line-height: 22px;
    font-size: 15px;
    ::placeholder{
      font-size: 14px;
    }
   }
   & .input-field:focus-visible{
    outline: none;
   }
   & .search-bar{
    height: 25px;
    width: 25px;
    position: absolute;
    color: grey;
   }
    & .select-container .css-1d3z3hw-MuiOutlinedInput-notchedOutline{  
    outline: none;
    border: none;
   }
   & .select-container .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon{
    top: 0px;
   }
   & .select-container .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select{
    padding: 5px;
   }

`
export const InputField = styled(TextField)`
  margin-bottom: 0 !important;

  .css-1d3z3hw-MuiOutlinedInput-notchedOutline{
    border: none;
  }
  .css-1g24dm6-MuiInputBase-input-MuiOutlinedInput-input{
    padding: 5px;
  }
`;

export const SearchContainer = styled.div`


`