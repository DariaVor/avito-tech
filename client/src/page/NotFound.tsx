import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant='h4' gutterBottom>
        404
      </Typography>
      <Typography variant='body1'>Страница не найдена</Typography>
    </Box>
  );
};

export default NotFound;
