import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import { AutoItem, ItemType, RealEstateItem, ServiceItem } from '../store/types';
import noImage from '../assets/no-image.svg';
import { useNavigate, useParams } from 'react-router';
import { useDeleteItemMutation } from '../store/api/itemApi';

const pluralizeExperience = (experience: number) => {
  if (experience === 1) {
    return 'год';
  } else if (experience > 1 && experience < 5) {
    return 'года';
  } else {
    return 'лет';
  }
};

const separateNumbers = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const ItemDetails: React.FC<{ item: RealEstateItem | AutoItem | ServiceItem }> = ({
  item,
}) => {
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
    <Container sx={{ mt: 4, border: '1px solid black', borderRadius: '8px', padding: '16px' }}>
      <Typography variant='h4' gutterBottom>
        {item.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img
            src={item.image || noImage}
            alt={item.name}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant='h6'>{item.description}</Typography>
          <Typography variant='body1' color='text.secondary'>
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
              <Typography variant='body1'>Модель: {item.model}</Typography>
              <Typography variant='body1'>Год выпуска: {item.year}</Typography>
              {item.mileage && (
                <Typography variant='body1'>Пробег: {separateNumbers(item.mileage)} км</Typography>
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

          <Divider sx={{ my: 2 }} />

          <Button
            variant='contained'
            sx={{
              mt: 2,
              backgroundColor: '#f2f1f0',
              color: 'black',
              border: 1,
              borderColor: 'black',
            }}
            onClick={() => navigate(`/list`)}
          >
            Назад
          </Button>
          <Button
            variant='contained'
            sx={{
              mt: 2,
              backgroundColor: '#a3d7ff',
              color: 'black',
              border: 1,
              borderColor: 'black',
            }}
            onClick={() => navigate(`/form/${id}`)}
          >
            Редактировать
          </Button>
          <Button
            variant='contained'
            sx={{
              mt: 2,
              backgroundColor: '#f5bdbc',
              color: 'black',
              border: 1,
              borderColor: 'black',
            }}
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
