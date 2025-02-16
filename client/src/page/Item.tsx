import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router';
import { useGetItemByIdQuery } from '../store/api/itemApi';
import { ErrorMessage, ItemDetails, Loader } from '../components/shared';

const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: item, isLoading, error } = useGetItemByIdQuery(Number(id));

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message='Ошибка загрузки объявления' />;
  }

  if (!item) {
    return <ErrorMessage message='Объявление не найдено' />;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 4,
        alignItems: 'center',
      }}
    >
      <ItemDetails item={item} />
    </Container>
  );
};

export default Item;
