import React from 'react';
import { Container, Divider, Grid, Typography, Box } from '@mui/material';
import { AutoItem, ItemType, RealEstateItem, ServiceItem } from '../../types';
import noImage from '../../assets/no-image.svg';
import { useNavigate, useParams } from 'react-router';
import { useDeleteItemMutation } from '../../store/api/itemApi';
import { BackButton, DeleteButton, EditButton } from '../ui';

const pluralizeExperience = (experience: number): string => {
  if (experience === 1) return 'год';
  if (experience > 1 && experience < 5) return 'года';
  return 'лет';
};

const separateNumbers = (n: number): string => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const ItemDetails: React.FC<{
  item: RealEstateItem | AutoItem | ServiceItem;
}> = ({ item }) => {
  const { type } = item;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deleteItem] = useDeleteItemMutation();

  const handleDelete = async () => {
    try {
      await deleteItem(Number(item.id)).unwrap();
      navigate('/list');
    } catch (error) {
      console.error('Ошибка удаления объявления:', error);
    }
  };

  return (
    <Container
      sx={{
        mt: 4,
        border: '1px solid black',
        borderRadius: '8px',
        p: 2,
        maxWidth: { xs: '100%', md: 800 },
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        sx={{ mb: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}
      >
        {item.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            component='img'
            src={item.image || noImage}
            alt={item.name}
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant='h6' sx={{ mb: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>
              {item.description}
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
            >
              Локация: {item.location}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Тип: {type}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {type === ItemType.REAL_ESTATE && (
              <>
                <Typography variant='body1'>Тип недвижимости: {item.propertyType}</Typography>
                <Typography variant='body1'>Площадь: {separateNumbers(item.area)} м²</Typography>
                <Typography variant='body1'>Количество комнат: {item.rooms}</Typography>
                <Typography variant='body1'>Цена: {separateNumbers(item.price)} ₽</Typography>
              </>
            )}

            {type === ItemType.AUTO && (
              <>
                <Typography variant='body1'>Марка: {item.brand}</Typography>
                <Typography variant='body1' sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                  Модель: {item.model}
                </Typography>
                <Typography variant='body1'>Год выпуска: {item.year}</Typography>
                {item.mileage && (
                  <Typography variant='body1'>
                    Пробег: {separateNumbers(item.mileage)} км
                  </Typography>
                )}
              </>
            )}

            {type === ItemType.SERVICES && (
              <>
                <Typography variant='body1'>Тип услуги: {item.serviceType}</Typography>
                <Typography variant='body1'>
                  Опыт работы: {item.experience} {pluralizeExperience(item.experience)}
                </Typography>
                <Typography variant='body1'>Стоимость: {separateNumbers(item.cost)} ₽</Typography>
                {item.workSchedule && (
                  <Typography variant='body1'>График работы: {item.workSchedule}</Typography>
                )}
              </>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Container sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
            <BackButton to='/list' />
            <EditButton to={`/form/${id}`} />
            <DeleteButton onClick={handleDelete} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
