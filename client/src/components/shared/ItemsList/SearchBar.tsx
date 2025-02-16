import React from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange, onClear }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label='Поиск по названию'
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        variant='outlined'
        fullWidth
        slotProps={{
          input: {
            endAdornment: searchText && (
              <InputAdornment position='end'>
                <IconButton onClick={onClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};
