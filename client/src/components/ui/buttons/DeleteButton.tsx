import React from 'react';
import { Button } from '@mui/material';

interface DeleteButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  sx?: object;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, children, sx }) => {
  return (
    <Button
      variant='contained'
      sx={{
        mt: 2,
        backgroundColor: '#f5bdbc',
        color: 'black',
        border: 1,
        borderColor: 'black',
        ...sx,
      }}
      onClick={onClick}
    >
      {children || 'Удалить'}
    </Button>
  );
};
