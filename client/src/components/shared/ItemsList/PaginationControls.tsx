import React from 'react';
import { Box } from '@mui/material';
import { PaginationButton } from '../../ui';

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
      <PaginationButton onClick={onPrevious} disabled={currentPage === 1}>
        Назад
      </PaginationButton>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationButton
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </PaginationButton>
      ))}
      <PaginationButton onClick={onNext} disabled={currentPage === totalPages || totalPages === 0}>
        Далее
      </PaginationButton>
    </Box>
  );
};
