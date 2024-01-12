import * as React from 'react';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';

import {
  StyleMain,
  StyleText,
} from '../../screens/leaveRequest/LeaveRequest.Styles';

export const BasicTable = ({ columns, rows, handleNavigate }) => {
  return (
    <>
      {rows?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columns?.map((item, index) => (
                  <TableCell key={index}>{item.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((item, index) => (
                <TableRow key={index} onClick={() => handleNavigate(index)}>
                  <TableCell>{index + 1}</TableCell>
                  {item?.map((rowData, index) => (
                    <TableCell key={index}>{rowData}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <StyleMain>
          <StyleText>No Leave Found</StyleText>
        </StyleMain>
      )}
    </>
  );
};
