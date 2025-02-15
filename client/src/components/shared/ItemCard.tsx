import React from 'react';
import { Card, CardMedia, Box, Typography } from '@mui/material';
import noImage from '../../assets/no-image.svg';
import { Item } from '../../types';
import { DetailsButton, TypeChip } from '../ui';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item: { id, name, location, type, image },
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        p: 2,
        mb: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: 600,
        mx: 'auto',
        border: '1px solid black',
      }}
    >
      <CardMedia
        component='img'
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 1,
          flexShrink: 0,
        }}
        image={image || noImage}
        alt={name}
      />

      <Box
        sx={{ flex: 1, mx: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {location}
        </Typography>
        <TypeChip type={type} />
      </Box>

      <DetailsButton to={`/item/${id}`} />
    </Card>
  );
};
