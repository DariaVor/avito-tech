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
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
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
          width: { xs: '100%', sm: 100 },
          height: { xs: 'auto', sm: 100 },
          objectFit: 'cover',
          borderRadius: 1,
          flexShrink: 0,
        }}
        image={image || noImage}
        alt={name}
      />

      <Box
        sx={{
          flex: 1,
          mx: 2,
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
            mb: 0.5,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {location}
        </Typography>
        <TypeChip type={type} />
      </Box>

      <DetailsButton to={`/item/${id}`} sx={{ mt: { xs: 2, sm: 1 } }} />
    </Card>
  );
};
