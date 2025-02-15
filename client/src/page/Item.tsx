import React from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useGetItemByIdQuery } from '../store/api/itemApi';
import { ItemDetails } from '../components/shared/ItemDetails';

export const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: item, isLoading, error } = useGetItemByIdQuery(Number(id));

  if (isLoading)
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );

  if (error) return <Typography sx={{ mt: 4 }}>Произошла ошибка при загрузке данных</Typography>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', mt: 4, alignItems: 'center' }}>
      <Typography variant='h4'>Детали объявления</Typography>
      {item ? (
        <>
          <ItemDetails item={item} />
        </>
      ) : (
        <Typography sx={{ mt: 4 }}>Объявление не найдено</Typography>
      )}
    </Container>
  );
};
