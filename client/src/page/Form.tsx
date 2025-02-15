import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Typography, CircularProgress } from '@mui/material';
import { AdvertisementForm, AdvertisementFormData } from '../components/AdForm';
import {
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
} from '../store/api/itemApi';

export const Form: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: item, isLoading: isItemLoading } = useGetItemByIdQuery(Number(id), {
    skip: !isEditing,
  });
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const handleCancel = () => {
    if (isEditing && id) {
      navigate(`/item/${id}`);
    } else {
      navigate('/list');
    }
  };

  const handleSubmit = async (data: AdvertisementFormData) => {
    try {
      if (isEditing && id) {
        await updateItem({ id: Number(id), item: data }).unwrap();
      } else {
        await createItem(data).unwrap();
      }
      navigate('/list');
    } catch (error) {
      console.error('Ошибка сохранения объявления:', error);
    }
  };

  if (isEditing && isItemLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        {isEditing ? 'Редактировать объявление' : 'Создать новое объявление'}
      </Typography>
      <AdvertisementForm
        initialData={item as AdvertisementFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={isEditing}
      />
    </Container>
  );
};
