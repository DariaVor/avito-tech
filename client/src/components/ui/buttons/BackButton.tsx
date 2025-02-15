import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

interface BackButtonProps {
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  sx?: object;
  type?: 'button' | 'submit' | 'reset';
}

export const BackButton: React.FC<BackButtonProps> = ({
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
        backgroundColor: '#f2f1f0',
        color: 'black',
        border: 1,
        borderColor: 'black',
        ...sx,
      }}
      onClick={handleClick}
    >
      {children || 'Назад'}
    </Button>
  );
};
