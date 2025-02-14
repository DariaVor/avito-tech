import { Container, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useGetItemByIdQuery } from '../store/api/itemApi';
import { ItemDetails } from '../components/ItemDetails';

export const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, error } = useGetItemByIdQuery(Number(id));

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography sx={{ mt: 4 }}>Произошла ошибка при загрузке данных</Typography>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        Детали объявления
      </Typography>
      {item ? (
        <ItemDetails item={item} />
      ) : (
        <Typography sx={{ mt: 4 }}>Объявление не найдено</Typography>
      )}
    </Container>
  );
};
