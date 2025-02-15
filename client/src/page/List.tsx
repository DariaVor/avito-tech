import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router';
import { useGetItemsQuery } from '../store/api/itemApi';
import { ItemCard } from '../components/ItemCard';

export const List: React.FC = () => {
  const { data: items, isLoading, error } = useGetItemsQuery();

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Произошла ошибка при загрузке данных</Typography>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', mt: 4, alignItems: 'center' }}>
      <Typography variant='h4' gutterBottom>
        Список объявлений
      </Typography>
      <Button
        variant='contained'
        component={Link}
        to='/form'
        sx={{ mb: 4, backgroundColor: '#b1f2bc', color: 'black', border: 1, borderColor: 'black' }}
      >
        Разместить объявление
      </Button>
      <Grid container spacing={4}>
        {items?.map((item) => (
          <Grid item xs={12} key={item.id}>
            <ItemCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
