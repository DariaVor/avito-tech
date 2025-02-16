import React from 'react';
import { Box, Button } from '@mui/material';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrevious,
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mb: 4,
      }}
    >
      <Button variant='outlined' disabled={currentPage === 1} onClick={onPrevious}>
        Назад
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          variant={currentPage === index + 1 ? 'contained' : 'outlined'}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        variant='outlined'
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={onNext}
      >
        Далее
      </Button>
    </Box>
  );
};
