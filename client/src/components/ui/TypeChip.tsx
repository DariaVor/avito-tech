import React from 'react';
import { Box, Typography } from '@mui/material';
import { ItemType } from '../../types';

interface TypeChipProps {
  type: ItemType;
}

const typeColors: Record<ItemType, { background: string; text: string }> = {
  [ItemType.REAL_ESTATE]: { background: '#D9EAFC', text: '#215285' },
  [ItemType.AUTO]: { background: '#DBD0F1', text: '#4A148C' },
  [ItemType.SERVICES]: { background: '#F7DDF0', text: '#7A1C62' },
};

export const TypeChip: React.FC<TypeChipProps> = ({ type }) => {
  const colors = typeColors[type] || { background: '#e0f7fa', text: '#000' };

  return (
    <Box
      sx={{
        mt: 1,
        backgroundColor: colors.background,
        color: colors.text,
        textAlign: 'center',
        alignSelf: 'start',
        px: 1,
        py: 0.5,
        borderRadius: 1,
      }}
    >
      <Typography variant='body2'>{type}</Typography>
    </Box>
  );
};
