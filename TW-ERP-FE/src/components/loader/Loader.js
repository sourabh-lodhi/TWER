import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader = ({ loaderSize, style, loaderStyle }) => {
  return (
    <Box sx={{ display: 'flex' }} style={style && style}>
      <CircularProgress size={loaderSize} sx={loaderStyle && loaderStyle} />
    </Box>
  );
};
