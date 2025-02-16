import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ItemType } from '../../../types';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h6'>Фильтр по категории:</Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes(ItemType.REAL_ESTATE)}
              onChange={() => onCategoryChange(ItemType.REAL_ESTATE)}
            />
          }
          label={ItemType.REAL_ESTATE}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes(ItemType.AUTO)}
              onChange={() => onCategoryChange(ItemType.AUTO)}
            />
          }
          label={ItemType.AUTO}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.includes(ItemType.SERVICES)}
              onChange={() => onCategoryChange(ItemType.SERVICES)}
            />
          }
          label={ItemType.SERVICES}
        />
      </FormGroup>
    </Box>
  );
};
