import React from 'react';
import { Button } from '@mui/material';

interface PaginationButtonProps {
  active?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  sx?: object;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  active,
  onClick,
  children,
  disabled,
  sx,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={active ? 'contained' : 'outlined'}
      sx={{
        backgroundColor: active ? '#FDECAE' : undefined,
        color: 'black',
        border: 1,
        borderColor: 'black',
        '&:hover': {
          backgroundColor: active ? '#FCD67C' : '#FFFDF6',
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
