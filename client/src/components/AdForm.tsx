import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { advertisementSchema } from '../validation/adSchema';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { z } from 'zod';
import { ItemType } from '../store/types';

export type AdvertisementFormData = z.infer<typeof advertisementSchema>;

interface AdvertisementFormProps {
  initialData?: AdvertisementFormData;
  onSubmit: (data: AdvertisementFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export const AdvertisementForm: React.FC<AdvertisementFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdvertisementFormData>({
    resolver: zodResolver(advertisementSchema),
    defaultValues:
      initialData ||
      ({
        name: '',
        description: '',
        location: '',
        image: '',
        type: ItemType.REAL_ESTATE,
        propertyType: '',
        area: 0,
        rooms: 0,
        price: 0,
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        mileage: 0,
        serviceType: '',
        experience: 0,
        cost: 0,
        workSchedule: '',
      } as any),
  });

  const selectedType = watch('type');

  const advertisementTypes = [
    { value: ItemType.REAL_ESTATE, label: 'Недвижимость' },
    { value: ItemType.AUTO, label: 'Авто' },
    { value: ItemType.SERVICES, label: 'Услуги' },
  ];

  const realEstateTypes = [
    { value: 'Квартира', label: 'Квартира' },
    { value: 'Дом', label: 'Дом' },
    { value: 'Коттедж', label: 'Коттедж' },
    { value: 'Дача', label: 'Дача' },
  ];

  const autoBrands = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes', label: 'Mercedes' },
  ];

  const serviceTypes = [
    { value: 'Ремонт', label: 'Ремонт' },
    { value: 'Уборка', label: 'Уборка' },
    { value: 'Доставка', label: 'Доставка' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Название'
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message as string}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Описание'
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message as string}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='location'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Локация'
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message as string}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Фото URL'
                fullWidth
                error={!!errors.image}
                helperText={errors.image?.message as string}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Категория объявления'
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message as string}
              >
                {advertisementTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {selectedType === ItemType.REAL_ESTATE && (
          <>
            <Grid item xs={12}>
              <Controller
                name='propertyType'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Тип недвижимости'
                    fullWidth
                    error={!!(errors as any).propertyType}
                    helperText={(errors as any).propertyType?.message as string}
                  >
                    {realEstateTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name='area'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 1 }}
                    label='Площадь (кв. м)'
                    fullWidth
                    error={!!(errors as any).area}
                    helperText={(errors as any).area?.message as string}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name='rooms'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 1 }}
                    label='Количество комнат'
                    fullWidth
                    error={!!(errors as any).rooms}
                    helperText={(errors as any).rooms?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name='price'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 0 }}
                    label='Цена'
                    fullWidth
                    error={!!(errors as any).price}
                    helperText={(errors as any).price?.message as string}
                  />
                )}
              />
            </Grid>
          </>
        )}

        {selectedType === ItemType.AUTO && (
          <>
            <Grid item xs={6}>
              <Controller
                name='brand'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Марка'
                    fullWidth
                    error={!!(errors as any).brand}
                    helperText={(errors as any).brand?.message as string}
                  >
                    {autoBrands.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='model'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Модель'
                    fullWidth
                    error={!!(errors as any).model}
                    helperText={(errors as any).model?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='year'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 1886 }}
                    label='Год выпуска'
                    fullWidth
                    error={!!(errors as any).year}
                    helperText={(errors as any).year?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='mileage'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 0 }}
                    label='Пробег (км)'
                    fullWidth
                    error={!!(errors as any).mileage}
                    helperText={(errors as any).mileage?.message as string}
                  />
                )}
              />
            </Grid>
          </>
        )}

        {selectedType === ItemType.SERVICES && (
          <>
            <Grid item xs={6}>
              <Controller
                name='serviceType'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Тип услуги'
                    fullWidth
                    error={!!(errors as any).serviceType}
                    helperText={(errors as any).serviceType?.message as string}
                  >
                    {serviceTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='experience'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 0, max: 100, step: 0.5 }}
                    label='Опыт работы (лет)'
                    fullWidth
                    error={!!(errors as any).experience}
                    helperText={(errors as any).experience?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='cost'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='number'
                    inputProps={{ min: 0, step: 0.5 }}
                    label='Стоимость'
                    fullWidth
                    error={!!(errors as any).cost}
                    helperText={(errors as any).cost?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='workSchedule'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='График работы'
                    fullWidth
                    error={!!(errors as any).workSchedule}
                    helperText={(errors as any).workSchedule?.message as string}
                  />
                )}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} container spacing={2} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='contained'
              onClick={onCancel}
              sx={{
                backgroundColor: '#f2f1f0',
                color: 'black',
                border: 1,
                borderColor: 'black',
              }}
            >
              Отмена
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              type='submit'
              sx={{
                backgroundColor: '#a3d7ff',
                color: 'black',
                border: 1,
                borderColor: 'black',
              }}
            >
              {isEditing ? 'Сохранить' : 'Создать'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
