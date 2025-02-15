import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router';

interface DetailsButtonProps {
  to: string;
  children?: React.ReactNode;
  sx?: object;
}

export const DetailsButton: React.FC<DetailsButtonProps> = ({ to, children, sx }) => {
  return (
    <Button
      variant='contained'
      component={Link}
      to={to}
      sx={{
        backgroundColor: '#b1f2bc',
        color: 'black',
        border: 1,
        borderColor: 'black',
        ...sx,
      }}
    >
      {children || 'Подробнее'}
    </Button>
  );
};
