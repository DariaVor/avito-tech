import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Typography } from '@mui/material';
import { AdvertisementForm, AdvertisementFormData } from '../components/shared/AdForm';

import {
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
} from '../store/api/itemApi';
import { ErrorMessage, Loader } from '../components/shared';
import { toast } from 'react-toastify';

const Form: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const {
    data: item,
    isLoading: isItemLoading,
    error,
  } = useGetItemByIdQuery(Number(id), {
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
        toast.success('Объявление успешно обновлено!');
      } else {
        await createItem(data).unwrap();
        toast.success('Объявление успешно создано!');
      }
      navigate('/list');
    } catch (error) {
      toast.error('Ошибка при сохранении объявления');
    }
  };

  if (isEditing && isItemLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message='Произошла ошибка при загрузке данных' />;
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

export default Form;
