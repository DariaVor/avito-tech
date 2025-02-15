import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useGetItemsQuery } from '../store/api/itemApi';
import { ItemCard } from '../components/shared/ItemCard';
import { DetailsButton } from '../components/ui';

export const List: React.FC = () => {
  const { data: items, isLoading, error } = useGetItemsQuery();

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Произошла ошибка при загрузке данных</Typography>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', mt: 4, alignItems: 'center' }}>
      <Typography variant='h4' gutterBottom>
        Список объявлений
      </Typography>
      <DetailsButton to='/form' sx={{ mb: 4 }}>
        Разместить объявление
      </DetailsButton>
      <Grid container spacing={4}>
        {items?.map((item) => (
          <Grid item xs={12} key={item.id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
