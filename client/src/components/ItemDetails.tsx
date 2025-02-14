import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import { AutoItem, ItemType, RealEstateItem, ServiceItem } from '../store/types';
import noImage from '../assets/no-image.svg';

export const ItemDetails: React.FC<{ item: RealEstateItem | AutoItem | ServiceItem }> = ({
  item,
}) => {
  const { type } = item;

  return (
    <Container sx={{ mt: 4 }}>
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

          {/* Display additional fields based on type */}
          {type === ItemType.REAL_ESTATE && (
            <>
              <Typography variant='body1'>Тип недвижимости: {item.propertyType}</Typography>
              <Typography variant='body1'>Площадь: {item.area} м²</Typography>
              <Typography variant='body1'>Количество комнат: {item.rooms}</Typography>
              <Typography variant='body1'>Цена: {item.price} ₽</Typography>
            </>
          )}

          {type === ItemType.AUTO && (
            <>
              <Typography variant='body1'>Марка: {item.brand}</Typography>
              <Typography variant='body1'>Модель: {item.model}</Typography>
              <Typography variant='body1'>Год выпуска: {item.year}</Typography>
              {item.mileage && <Typography variant='body1'>Пробег: {item.mileage} км</Typography>}
            </>
          )}

          {type === ItemType.SERVICES && (
            <>
              <Typography variant='body1'>Тип услуги: {item.serviceType}</Typography>
              <Typography variant='body1'>Опыт работы: {item.experience} лет</Typography>
              <Typography variant='body1'>Стоимость: {item.cost} ₽</Typography>
              {item.workSchedule && (
                <Typography variant='body1'>График работы: {item.workSchedule}</Typography>
              )}
            </>
          )}

          <Divider sx={{ my: 2 }} />
          <Button variant='contained' sx={{ mt: 2 }} href='/list'>
            Назад
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
