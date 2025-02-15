import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

interface EditButtonProps {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  sx?: object;
  type?: 'button' | 'submit' | 'reset';
}

export const EditButton: React.FC<EditButtonProps> = ({
  to,
  onClick,
  children,
  sx,
  type = 'button',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <Button
      type={type}
      variant='contained'
      sx={{
        mt: 2,
        backgroundColor: '#a3d7ff',
        color: 'black',
        border: 1,
        borderColor: 'black',
        ...sx,
      }}
      onClick={handleClick}
    >
      {children || 'Редактировать'}
    </Button>
  );
};
