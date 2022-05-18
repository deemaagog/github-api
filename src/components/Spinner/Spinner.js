import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './spinner.css';

export const Spinner = () => {
  return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
  )
}
